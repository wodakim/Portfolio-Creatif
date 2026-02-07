'use client';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function GlitchBackground() {
  const { activeProjectImage } = useStore();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen bg-black/40">
      <AnimatePresence mode="popLayout">
        {activeProjectImage && (
          <motion.div
            key={activeProjectImage}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 0.6, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={activeProjectImage}
              alt="Project Background"
              fill
              className="object-cover object-center opacity-70"
              priority
            />

            {/* VHS Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

            {/* Color Shift Animation (Simulated Glitch) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-accent-green/20 mix-blend-overlay animate-pulse pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
