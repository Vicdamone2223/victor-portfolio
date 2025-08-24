'use client';
import { useReducedMotion } from 'framer-motion';

export default function HeroSheen({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="sheen" />
      </div>
      <style>{`
        .sheen{
          position:absolute;
          inset:-20%;
          background:
            linear-gradient(105deg, rgba(255,255,255,0) 30%,
                                   rgba(255,255,255,.12) 45%,
                                   rgba(255,255,255,0) 60%);
          transform: translateX(-120%);
          animation: sheen-scan 9s ease-in-out infinite;
          filter: blur(2px);
        }
        @keyframes sheen-scan{
          0%,60%  { transform: translateX(-120%) }
          70%     { transform: translateX(0%) }
          85%,100%{ transform: translateX(120%) }
        }
      `}</style>
    </div>
  );
}
