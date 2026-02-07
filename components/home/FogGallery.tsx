'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/mock-data';

export default function FogGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Update CSS variables for mouse position on the container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Calculate position relative to the grid container
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="min-h-screen py-32 bg-dark relative">
        <div className="absolute top-10 left-4 md:left-12 z-20 pointer-events-none">
             <h2 className="font-heading text-4xl text-white/20">/ ARCHIVES</h2>
        </div>

      <div className="container mx-auto px-4 md:px-12">
        {/* The Grid Wrapper */}
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative group cursor-crosshair"
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%',
            } as React.CSSProperties}
        >

           {/* Layer 1: The "Fogged" / Dimmed state (Background)
               - Visible everywhere but dark/obscured (opacity-10).
               - Not interactive (pointer-events-none).
           */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 opacity-10 pointer-events-none grayscale">
               {projects.map((project) => (
                   <ProjectCard key={project._id} project={project} />
               ))}
           </div>

           {/* Layer 2: The "Lit" / Revealed state (Foreground)
               - Fully visible (opacity-100).
               - Interactive (pointer-events-auto).
               - Masked by radial-gradient tracking mouse.
           */}
           <div
               className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pointer-events-auto transition-opacity duration-300"
               style={{
                   maskImage: 'radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)',
                   WebkitMaskImage: 'radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)',
               }}
           >
               {projects.map((project) => (
                   <ProjectCard key={project._id} project={project} interactive />
               ))}
           </div>

        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, interactive = false }: { project: any, interactive?: boolean }) {
  // If not interactive, just render a div to save resources/prevent accidental clicks on bottom layer
  const Wrapper = interactive ? Link : 'div';
  const props = interactive ? { href: `/work/${project.slug.current}` } : {};

  return (
    <Wrapper
        {...props}
        className={`block relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-black/50 ${interactive ? 'hover:scale-[1.02] transition-transform duration-500' : ''}`}
    >
      <Image
        src={project.mainImage.asset.url}
        alt={project.mainImage.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
        <h3 className="font-heading text-3xl md:text-4xl text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 font-mono text-sm line-clamp-2 mb-4">{project.description}</p>
        <div className="flex gap-2">
            {project.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs font-mono border border-accent-green/50 text-accent-green px-2 py-0.5 rounded-full">{tag}</span>
            ))}
        </div>
      </div>
    </Wrapper>
  )
}
