// Procedural Audio Synthesizer using Web Audio API
// No assets to download, zero latency, highly performant.

class AudioSystem {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private isMusicPlaying = false;
  private isMusicInitiated = false;
  private audioHtml: HTMLAudioElement | null = null;
  private synthInterval: any = null;
  private activeSynthOscillators: OscillatorNode[] = [];

  constructor() {}

  // Initialize and unlock audio context (must be called from a user gesture like clicking "Começar")
  public init() {
    if (this.ctx) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  public getContext() {
    return this.ctx;
  }

  // Play ambient music. We support a royalty-free URL first. If not ready or blocked, we fallback to procedural synth.
  public async playMusic() {
    this.init();
    if (!this.ctx) return;

    // If the HTML Audio element is already created, try playing it (resuming context if suspended)
    if (this.audioHtml) {
      if (this.ctx.state === 'suspended') {
        try {
          await this.ctx.resume();
        } catch (e) {
          console.warn('Failed to resume AudioContext on subsequent call:', e);
        }
      }
      if (!this.isMusicPlaying) {
        this.audioHtml.play().then(() => {
          this.isMusicPlaying = true;
        }).catch((err) => {
          console.warn('HTML Audio play failed on subsequent call:', err);
        });
      }
      return;
    }

    if (this.isMusicInitiated) return;
    this.isMusicInitiated = true;

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('Failed to resume AudioContext:', e);
      }
    }

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.musicGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 3.0); // 3-second fade-in
    this.musicGain.connect(this.ctx.destination);

    // Primary: Load a premium license-free soft piano ambient loop
    // Using a reliable public URL for romantic piano
    try {
      this.audioHtml = new Audio();
      this.audioHtml.src = '/romantic-birthday-music.mp3';
      this.audioHtml.loop = true;
      this.audioHtml.crossOrigin = 'anonymous';

      const source = this.ctx.createMediaElementSource(this.audioHtml);
      source.connect(this.musicGain);
      
      this.audioHtml.play().then(() => {
        this.isMusicPlaying = true;
      }).catch((err) => {
        console.warn('HTML Audio autoplay blocked or failed, waiting for user interaction:', err);
        // Do not set isMusicPlaying = true so it can retry on user interaction
        this.isMusicPlaying = false;
        // As a fallback, we also start the procedural synth so there's at least some audio if HTML audio fails entirely
        this.startProceduralSynth();
      });
    } catch (e) {
      console.warn('Failed to setup HTML Audio, using procedural synth:', e);
      this.isMusicPlaying = false;
      this.startProceduralSynth();
    }
  }

  // Synthesizes a beautiful slow ambient piano/pad progression (Cmaj7 - Am9 - Fmaj7 - G6/9)
  // Generating lush chords procedurally using sine and triangle oscillators with a long release
  private startProceduralSynth() {
    if (!this.ctx || this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    const chords = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
      [110.00, 146.83, 174.61, 220.00, 277.18], // Am9 (A2, D3, F3, A3, C#4)
      [87.31, 130.81, 174.61, 218.27, 261.63], // Fmaj9 (F2, C3, F3, A3, C4)
      [98.00, 146.83, 196.00, 246.94, 293.66]  // G6/9 (G2, D3, G3, B3, D4)
    ];

    let chordIndex = 0;

    const playNextChord = () => {
      if (!this.ctx || !this.isMusicPlaying) return;
      const now = this.ctx.currentTime;
      const notes = chords[chordIndex];
      const duration = 7.0; // 7 seconds per chord

      // Clean up previous oscillators
      this.activeSynthOscillators = this.activeSynthOscillators.filter(osc => {
        try {
          osc.stop();
        } catch(e) {}
        return false;
      });

      notes.forEach((freq) => {
        if (!this.ctx || !this.musicGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        // Warm blend of triangle and sine
        osc.type = Math.random() > 0.4 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        // Add subtle vibrato (LFO)
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.5 + Math.random() * 0.5; // slow
        lfoGain.gain.value = freq * 0.005; // tiny pitch dev
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);

        // Amplitude Envelope
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.015, now + 1.5); // Slow attack
        oscGain.gain.setValueAtTime(0.015, now + duration - 2.0);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Long decay

        osc.connect(oscGain);
        oscGain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + duration);
        this.activeSynthOscillators.push(osc);
      });

      chordIndex = (chordIndex + 1) % chords.length;
    };

    // Initial play
    playNextChord();
    this.synthInterval = setInterval(playNextChord, 6500); // Overlay transitions slightly
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.audioHtml) {
      try {
        this.audioHtml.pause();
      } catch(e){}
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    // Fade out gain node
    if (this.ctx && this.musicGain) {
      const now = this.ctx.currentTime;
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
      this.musicGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
    }
    // Stop active oscillators
    this.activeSynthOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch(e){}
    });
    this.activeSynthOscillators = [];
  }

  public toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic();
    } else {
      this.playMusic();
    }
    return this.isMusicPlaying;
  }

  public getIsPlaying() {
    return this.isMusicPlaying;
  }

  // Synthesize a soft golden bell chime (for unlocking secrets or flip cards)
  public playChime() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Create multiple sine waves for a rich overtone chime
    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (C Major arpeggio)
    
    frequencies.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.04); // Staggered arpeggio
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.08 / (index + 1), now + index * 0.04 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 1.5);
    });
  }

  // Synthesize friction noise for a paper/page flip sound
  public playPageFlip() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Create custom noise buffer
    const bufferSize = this.ctx.sampleRate * 0.35; // 0.35 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.3);
    filter.Q.setValueAtTime(2.0, now);
    
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    noise.start(now);
    noise.stop(now + 0.35);
  }

  // Synthesize sound for opening an envelope/letter
  public playLetterOpen() {
    if (!this.ctx) return;
    this.playPageFlip(); // starts with paper rustle
    
    // Add a magical slide up
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.05, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Synthesize a clean micro-click for UI buttons
  public playClick() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
    
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Synthesize sound when a video modal opens
  public playVideoSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Sub-bass sweep + clean chime
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, now);
    osc1.frequency.linearRampToValueAtTime(120, now + 0.4);
    
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.3);
    
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.04, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    
    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  }

  // Typewriter soft clicks
  public typewriterBeep() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'triangle';
    // Randomize frequency slightly for realistic typing sound
    osc.frequency.setValueAtTime(600 + Math.random() * 300, now);
    
    gainNode.gain.setValueAtTime(0.015, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.02);
  }
}

export const audioSystem = new AudioSystem();
