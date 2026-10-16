'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

interface GridMotionProps {
  items?: (string | React.ReactNode)[];
  gradientColor?: string;
}

const GridMotion = ({ items = [], gradientColor = 'black' }: GridMotionProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    let rafId: number | null = null;
    let isVisible = false;
    const maxMoveAmount = 140;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible || rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const ratio = (e.clientX / window.innerWidth) - 0.5;
        rowRefs.current.forEach((row, index) => {
          if (row) {
            const direction = index % 2 === 0 ? 1 : -1;
            gsap.to(row, {
              x: ratio * maxMoveAmount * direction,
              duration: 1.0,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="noscroll loading" ref={gridRef}>
      <section
        className="intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="row" ref={el => {
                rowRefs.current[rowIndex] = el;
              }}>
              {[...Array(14)].map((_, itemIndex) => {
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner">
                      {/* Empty premium glass card */}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
