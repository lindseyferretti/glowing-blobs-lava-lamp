import React, { useEffect, useRef, useState, useCallback } from 'react';
import Settings from './Settings';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const LavaLamp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobs = useRef<Blob[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [blobSpeed, setBlobSpeed] = useState(50);
  const [numBlobs, setNumBlobs] = useState(12);
  const [gradientStart, setGradientStart] = useState('#D946EF');
  const [gradientEnd, setGradientEnd] = useState('#9b87f5');
  const [smoothness, setSmoothness] = useState(5);

  const initBlobs = useCallback((canvas: HTMLCanvasElement) => {
    blobs.current = [];
    const maxRadius = window.innerWidth * 0.1;
    const minRadius = maxRadius * 0.05;
    const speedMultiplier = blobSpeed / 50;

    for (let i = 0; i < numBlobs; i++) {
      blobs.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * speedMultiplier,
        vy: (-Math.random() - 0.5) * speedMultiplier,
        radius: minRadius + Math.random() * (maxRadius - minRadius),
      });
    }
  }, [numBlobs, blobSpeed]);

  const updateSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initBlobs(canvas);
  }, [initBlobs]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blobs.current.forEach((blob) => {
      blob.x += blob.vx;
      blob.y += blob.vy;

      if (blob.x < blob.radius) {
        blob.x = blob.radius;
        blob.vx *= -1;
      }
      if (blob.x > canvas.width - blob.radius) {
        blob.x = canvas.width - blob.radius;
        blob.vx *= -1;
      }

      if (blob.y < -blob.radius * 2) {
        blob.y = canvas.height + blob.radius;
        blob.x = Math.random() * canvas.width;
      }

      const dx = mousePos.current.x - blob.x;
      const dy = mousePos.current.y - blob.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const repulsionRange = 150;
      
      if (distance < repulsionRange) {
        const angle = Math.atan2(dy, dx);
        const repulsion = (repulsionRange - distance) / repulsionRange;
        const repulsionForce = 5;
        blob.x -= Math.cos(angle) * repulsion * repulsionForce;
        blob.y -= Math.sin(angle) * repulsion * repulsionForce;
      }
    });

    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    const stepSize = 11 - smoothness;
    for (let x = 0; x < canvas.width; x += stepSize) {
      for (let y = 0; y < canvas.height; y += stepSize) {
        let sum = 0;
        blobs.current.forEach(blob => {
          const dx = x - blob.x;
          const dy = y - blob.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          sum += (blob.radius * blob.radius) / (distance * distance);
        });
        
        if (sum > 1) {
          ctx.rect(x, y, stepSize, stepSize);
        }
      }
    }
    
    ctx.fill();
    ctx.shadowColor = 'rgba(155, 135, 245, 0.6)';
    ctx.shadowBlur = 20;

    animationFrameId.current = requestAnimationFrame(animate);
  }, [gradientStart, gradientEnd, smoothness]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');
    if (!contextRef.current) return;

    updateSize();
    window.addEventListener('resize', updateSize);
    canvas.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateSize, handleMouseMove, animate]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 bg-darkBg"
        style={{ touchAction: 'none' }}
      />
      <Settings
        blobSpeed={blobSpeed}
        setBlobSpeed={setBlobSpeed}
        numBlobs={numBlobs}
        setNumBlobs={setNumBlobs}
        gradientStart={gradientStart}
        setGradientStart={setGradientStart}
        gradientEnd={gradientEnd}
        setGradientEnd={setGradientEnd}
        smoothness={smoothness}
        setSmoothness={setSmoothness}
      />
    </>
  );
};

export default LavaLamp;