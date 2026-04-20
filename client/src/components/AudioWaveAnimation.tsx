import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * AudioWaveAnimation Component
 * 
 * Design Philosophy: Signal Grid - Precisión Suiza con Alma Digital
 * - Animación de ondas de energía azul índigo sobre fondo oscuro
 * - Representa la tecnología de voz IA de Klarson
 * - Efecto fluido y dinámico con movimiento orgánico
 */

export default function AudioWaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent dark background for trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.01;
      const time = timeRef.current;

      // Draw multiple wave layers for depth
      drawWaveLayers(ctx, width, height, time);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const drawWaveLayers = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const centerY = height / 2;
    const waveCount = 3;

    // Draw multiple wave layers with different frequencies and amplitudes
    for (let layer = 0; layer < waveCount; layer++) {
      const frequency = 0.005 + layer * 0.002;
      const amplitude = 40 - layer * 10;
      const speed = 1 + layer * 0.3;
      
      // Color gradient from bright blue to darker indigo
      const hue = 220 - layer * 10;
      const saturation = 100 - layer * 15;
      const lightness = 55 - layer * 10;
      
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.lineWidth = 2 - layer * 0.3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw wave
      ctx.beginPath();
      
      for (let x = 0; x < width; x += 5) {
        const y = centerY + 
          Math.sin((x * frequency + time * speed) * Math.PI) * amplitude +
          Math.sin((x * frequency * 0.5 + time * speed * 0.7) * Math.PI) * (amplitude * 0.5);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Add glow effect with additional strokes
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 6 - layer * 1;
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`;
      
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = centerY + 
          Math.sin((x * frequency + time * speed) * Math.PI) * amplitude +
          Math.sin((x * frequency * 0.5 + time * speed * 0.7) * Math.PI) * (amplitude * 0.5);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Add floating particles for extra dynamism
    drawParticles(ctx, width, height, time);
  };

  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 80 + Math.sin(time * 0.5 + i) * 30;
      const x = width / 2 + Math.cos(angle + time * 0.3) * radius;
      const y = height / 2 + Math.sin(angle + time * 0.3) * radius;
      
      const size = 2 + Math.sin(time * 2 + i) * 1.5;
      
      ctx.fillStyle = `hsla(220, 100%, 60%, ${0.6 + Math.sin(time + i) * 0.3})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.2) 0%, rgba(15, 23, 42, 0) 70%)',
        }}
      />
      
      {/* Overlay gradient for smooth integration */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 pointer-events-none" />
    </motion.div>
  );
}
