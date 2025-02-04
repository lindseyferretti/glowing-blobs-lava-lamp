import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize blobs when screen size changes
      initBlobs();
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize blobs with responsive sizes
    const initBlobs = () => {
      const numBlobs = 8; // Increased number of blobs
      blobs.current = [];
      
      // Calculate responsive min and max sizes based on screen dimensions
      const minDimension = Math.min(canvas.width, canvas.height);
      const minSize = minDimension * 0.02; // 2% of smallest screen dimension
      const maxSize = minDimension * 0.06; // 6% of smallest screen dimension

      for (let i = 0; i < numBlobs; i++) {
        blobs.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          radius: minSize + Math.random() * (maxSize - minSize),
        });
      }
    };
    initBlobs();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobs.current.forEach((blob) => {
        // Update position
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Wall collision
        if (blob.x < blob.radius) {
          blob.x = blob.radius;
          blob.vx *= -1;
        }
        if (blob.x > canvas.width - blob.radius) {
          blob.x = canvas.width - blob.radius;
          blob.vx *= -1;
        }

        // Reset if above screen
        if (blob.y < -blob.radius * 2) {
          blob.y = canvas.height + blob.radius;
          blob.x = Math.random() * canvas.width;
        }

        // Mouse repulsion
        const dx = mousePos.current.x - blob.x;
        const dy = mousePos.current.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const repulsion = (150 - distance) / 150;
          blob.x -= Math.cos(angle) * repulsion * 5;
          blob.y -= Math.sin(angle) * repulsion * 5;
        }
      });

      // Create metaball effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#9b87f5');
      gradient.addColorStop(1, '#D946EF');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Draw metaballs
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 bg-darkBg"
      style={{ touchAction: 'none' }}
    />
  );
};

export default LavaLamp;