'use client';
import { motion } from 'framer-motion';
import { projects } from '@/lib/mock-data';
import DecoderText from '@/components/ui/DecoderText';
import ScrambleText from '@/components/ui/ScrambleText';
import GlitchBackground from '@/components/home/GlitchBackground';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

export default function Hero() {
  const { setProjectImage, setCursor } = useStore();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-20 overflow-hidden">
      {/* Background with Glitch Effect */}
      <GlitchBackground />

      <div className="z-10 flex flex-col gap-6 w-full max-w-7xl mx-auto">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-8 opacity-70">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            <h1 className="text-xs md:text-sm font-mono text-accent-green tracking-widest">
            <DecoderText text="> SYSTEM.INIT_SEQUENCE_COMPLETE // WELCOME USER" delay={500} />
            </h1>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
              className="group relative cursor-pointer w-fit"
              onMouseEnter={() => {
                setProjectImage(project.mainImage.asset.url);
                setCursor('link', 'EXPLORE');
                setHoveredProject(project._id);
              }}
              onMouseLeave={() => {
                setProjectImage(null);
                setCursor('default');
                setHoveredProject(null);
              }}
            >
              <div className="flex items-center gap-6 md:gap-12">
                 <span className="font-mono text-xs md:text-sm text-accent-green/60 hidden md:inline-block w-8">
                    {`0${i + 1}`}
                 </span>

                 <h2 className={`text-4xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter transition-all duration-300 ${hoveredProject === project._id ? 'text-white translate-x-4' : 'text-white/20'}`}>
                    <span className="relative block">
                      {/* The Text Component */}
                      <ScrambleText
                        text={project.title}
                        isHovered={hoveredProject === project._id}
                        className={hoveredProject === project._id ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-white/20 font-mono text-3xl md:text-6xl lg:text-8xl"}
                        scrambleSpeed={40}
                      />

                      {/* Glitch Overlay Text (Ghost) */}
                      {hoveredProject === project._id && (
                        <>
                            <span className="absolute inset-0 text-accent-blue opacity-50 animate-pulse mix-blend-screen translate-x-[-2px] skew-x-12 pointer-events-none" aria-hidden="true">
                            {project.title}
                            </span>
                            <span className="absolute inset-0 text-accent-green opacity-50 animate-bounce mix-blend-screen translate-x-[2px] skew-x-[-12deg] pointer-events-none" aria-hidden="true">
                            {project.title}
                            </span>
                        </>
                      )}
                    </span>
                 </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer / Terminal Hint */}
      <div className="absolute bottom-10 left-6 md:left-20 font-mono text-xs text-white/30">
        <DecoderText text="[ SCROLL TO NAVIGATE ]" delay={2000} />
      </div>
    </section>
  );
}
