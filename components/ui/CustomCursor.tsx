'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function CustomCursor() {
  const { cursorType, cursorText } = useStore();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const variants: Variants = {
    default: {
      height: 16,
      width: 16,
      x: -8,
      y: -8,
      backgroundColor: "#EDEDED",
      mixBlendMode: "difference",
      borderRadius: 0,
    },
    link: {
      height: 48,
      width: 48,
      x: -24,
      y: -24,
      backgroundColor: "#9BBC0F",
      mixBlendMode: "difference",
      borderRadius: 0,
      rotate: 45, // Retro gaming touch?
    },
    text: {
      height: 32,
      width: 4,
      x: -2,
      y: -16,
      backgroundColor: "#00F3FF",
      mixBlendMode: "normal",
      borderRadius: 0,
    },
    button: {
      height: 48,
      width: 48,
      x: -24,
      y: -24,
      backgroundColor: "transparent",
      border: "2px solid #9BBC0F",
      borderRadius: 4,
    }
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        variants={variants}
        animate={cursorType}
        initial="default"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono text-black font-bold whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
