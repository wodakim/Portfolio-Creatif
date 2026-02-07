'use client';
import { useEffect, useState, useRef } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
  scrambleSpeed?: number;
}

export default function ScrambleText({ text, isHovered, className = '', scrambleSpeed = 30 }: ScrambleTextProps) {
  const [display, setDisplay] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;

    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(() => text
        .split('')
        .map((char, index) => {
          if (isHovered) {
             // Reveal logic: If index < iteration, show char. Else show random.
             if (index < iteration) return text[index];
             return CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
             // Scramble logic: Always show random or static scrambled?
             // If we want it to look like code, we can just return random chars.
             // Or we can reveal a "code name" instead?
             // Let's just keep it fully scrambled.
             return CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        })
        .join('')
      );

      if (isHovered && iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text, scrambleSpeed]);

  return <span className={className}>{display || text.replace(/./g, '#')}</span>;
}
