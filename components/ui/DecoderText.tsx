'use client';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface DecoderTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function DecoderText({ text, className = '', delay = 0 }: DecoderTextProps) {
  const [display, setDisplay] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let iteration = 0;
      const startDelay = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplay(() => text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
          );

          if (iteration >= text.length) {
            clearInterval(interval);
            setHasAnimated(true);
          }

          iteration += 1 / 2; // Adjust speed here (higher denominator = slower)
        }, 30);
        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(startDelay);
    }
  }, [isInView, text, delay, hasAnimated]);

  return <span ref={ref} className={className}>{display || text.replace(/./g, '#')}</span>;
}
