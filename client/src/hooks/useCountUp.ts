import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Hook para animar números desde 0 hasta un valor final
 * Se activa cuando el elemento es visible en el viewport
 */
export function useCountUp({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function para animación suave (ease-out)
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(end * easeOutQuad);

      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [end, duration, hasAnimated]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (elementRef.current) {
      // Cleanup previous observer
    }

    if (node) {
      elementRef.current = node;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              startAnimation();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(node);

      return () => observer.disconnect();
    }
  }, [hasAnimated, startAnimation]);

  return {
    value: `${prefix}${count.toLocaleString()}${suffix}`,
    ref: setRef,
  };
}
