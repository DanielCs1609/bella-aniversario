import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  decay: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  cintilationSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let particles: Particle[] = [];
    let shootingStar: ShootingStar | null = null;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000); // Proportional count
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          alpha: Math.random(),
          cintilationSpeed: 0.005 + Math.random() * 0.015
        });
      }
    };

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        size: 0.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -0.2 - Math.random() * 0.5,
        alpha: 0.2 + Math.random() * 0.6,
        decay: 0.001 + Math.random() * 0.003
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const triggerShootingStar = () => {
      if (Math.random() < 0.0025 && !shootingStar) { // ~Every 5-8 seconds average
        shootingStar = {
          x: Math.random() * canvas.width * 0.7,
          y: 0,
          length: 80 + Math.random() * 120,
          speed: 12 + Math.random() * 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.1, // down and right
          alpha: 1.0
        };
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    resizeCanvas();

    // Loop
    const render = () => {
      ctx.fillStyle = 'rgba(9, 9, 9, 0.2)'; // Clear canvas with slight alpha to leave trace
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new float particles periodically
      if (particles.length < 80 && Math.random() < 0.3) {
        createParticle(Math.random() * canvas.width, canvas.height + 10);
      }

      // Draw Static Stars
      stars.forEach(star => {
        star.alpha += star.cintilationSpeed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.cintilationSpeed = -star.cintilationSpeed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Shooting Star
      if (shootingStar) {
        ctx.strokeStyle = `rgba(212, 175, 55, ${shootingStar.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        
        const endX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;
        
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Advance shooting star
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar = null;
        }
      } else {
        triggerShootingStar();
      }

      // Draw Floating Particles
      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;

        // Interaction with mouse/touch
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push away
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        }

        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (p.alpha <= 0 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
