"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;  // -1 to 1 (normalized from center)
  y: number;  // -1 to 1 (normalized from center)
}

/**
 * Tracks mouse position with smoothing for parallax effects.
 * Returns normalized values from -1 to 1 where (0,0) is center.
 */
export const useMousePosition = (smoothing = 0.08): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    setPosition(prev => {
      const newX = prev.x + (targetRef.current.x - prev.x) * smoothing;
      const newY = prev.y + (targetRef.current.y - prev.y) * smoothing;

      // Only update if there's meaningful change (performance optimization)
      if (Math.abs(newX - prev.x) < 0.0001 && Math.abs(newY - prev.y) < 0.0001) {
        return prev;
      }

      return { x: newX, y: newY };
    });
    rafRef.current = requestAnimationFrame(animate);
  }, [smoothing]);

  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range (0,0 is center)
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return position;
};

export default useMousePosition;
