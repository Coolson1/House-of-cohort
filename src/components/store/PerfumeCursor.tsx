"use client";

import { useEffect, useState, useRef } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  opacity: number;
  life: number;
};

export function PerfumeCursor({ 
  containerRef,
  enabled = true,
  glowColor = "rgba(201, 168, 76, 0.6)"
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>;
  enabled?: boolean;
  glowColor?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const particleIdRef = useRef(0);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current || !enabled) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number;
      
      if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      
      const boundedX = Math.max(0, Math.min(x, rect.width));
      const boundedY = Math.max(0, Math.min(y, rect.height));
      
      setMousePos({ x: boundedX, y: boundedY });
      
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      
      setIsVisible(true);

      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: boundedX,
        y: boundedY,
        opacity: 1,
        life: 1
      };

      setParticles(prev => [...prev, newParticle].slice(-3));
    };

    const handlePointerEnter = () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      setIsVisible(true);
    };

    const handlePointerLeave = () => {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 300);
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("touchstart", handlePointerMove as EventListener);
    container.addEventListener("touchmove", handlePointerMove as EventListener);
    container.addEventListener("touchend", handlePointerLeave);

    const animateParticles = () => {
      setParticles(prev => 
        prev.map(p => ({ 
          ...p, 
          y: p.y - 0.8,
          opacity: p.opacity - 0.03,
          life: p.life - 0.03
        })).filter(p => p.opacity > 0)
      );
      requestAnimationFrame(animateParticles);
    };

    const animationId = requestAnimationFrame(animateParticles);

    return () => {
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseenter", handlePointerEnter);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("touchstart", handlePointerMove as EventListener);
      container.removeEventListener("touchmove", handlePointerMove as EventListener);
      container.removeEventListener("touchend", handlePointerLeave);
      
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      cancelAnimationFrame(animationId);
    };
  }, [containerRef, enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="pointer-events-none absolute z-50 transition-opacity duration-300 ease-out"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.8})`,
          filter: `drop-shadow(0 0 8px ${glowColor})`,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C9 2 7 4 7 7V15C7 17.21 8.79 19 11 19H13C15.21 19 17 17.21 17 15V7C17 4 15 2 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M10 2V1C10 0.45 10.45 0 11 0H13C13.55 0 14 0.45 14 1V2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 7C9 7 10 8 12 8C14 8 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-40 w-1.5 h-1.5 bg-brand-gold rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity * 0.8,
            transform: `scale(${0.5 + particle.life * 0.5})`,
            boxShadow: `0 0 6px ${glowColor}`,
          }}
        />
      ))}
    </>
  );
}