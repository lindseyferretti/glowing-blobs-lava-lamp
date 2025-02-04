import React, { useEffect, useRef, useState } from 'react';
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

  const [blobSpeed, setBlobSpeed] = useState(50);
  const [blobStickiness, setBlobStickiness] = useState(50);
  const [numBlobs, setNumBlobs] = useState(12);
  const [gradientStart, setGradientStart] = useState('#9b87f5');
  const [gradientEnd, setGradientEnd] = useState('#D946EF');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initBlobs = () => {
      blobs.current = [];
      
      const maxRadius = window.innerWidth * 0.1;
      const minRadius = maxRadius * 0.05;

      for (let i = 0; i < numBlobs; i++) {
        const speedMultiplier = blobSpeed / 50;
        blobs.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          vx: (Math.random() - 0.5) * speedMultiplier,
          vy: (-Math.random() - 0.5) * speedMultiplier,
          radius: minRadius + Math.random() * (maxRadius - minRadius),
        });
      }
    };

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlobs();
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
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
        const repulsionRange = 150 * (blobStickiness / 50);
        
        if (distance < repulsionRange) {
          const angle = Math.atan2(dy, dx);
          const repulsion = (repulsionRange - distance) / repulsionRange;
          const repulsionForce = 5 * (blobStickiness / 50);
          blob.x -= Math.cos(angle) * repulsion * repulsionForce;
          blob.y -= Math.sin(angle) * repulsion * repulsionForce;
        }
      });

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, gradientStart);
      gradient.addColorStop(1, gradientEnd);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      const stepSize = 5;
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
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [numBlobs, blobSpeed, blobStickiness, gradientStart, gradientEnd]);

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
        blobStickiness={blobStickiness}
        setBlobStickiness={setBlobStickiness}
        numBlobs={numBlobs}
        setNumBlobs={setNumBlobs}
        gradientStart={gradientStart}
        setGradientStart={setGradientStart}
        gradientEnd={gradientEnd}
        setGradientEnd={setGradientEnd}
      />
    </>
  );
};

export default LavaLamp;