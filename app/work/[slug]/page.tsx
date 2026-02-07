import { projects } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug.current === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 px-4 md:px-12 bg-dark text-white">
      <h1 className="font-heading text-6xl md:text-8xl mb-8">{project.title}</h1>
      <div className="relative w-full aspect-video mb-12 overflow-hidden rounded-lg border border-white/10">
         <Image
            src={project.mainImage.asset.url}
            alt={project.mainImage.alt}
            fill
            className="object-cover"
         />
      </div>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="md:col-span-1">
          <p className="font-mono text-accent-green mb-4">/ SPECS</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="border border-white/20 px-3 py-1 rounded-full text-sm font-mono hover:border-accent-green transition-colors cursor-default">{tag}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
           <p className="text-xl leading-relaxed text-gray-300 font-mono">{project.description}</p>

           <div className="mt-12 space-y-12">
              {project.blocks.map((block, i) => {
                 if (block._type === 'blockText') {
                    return <p key={i} className="text-gray-400 font-mono">{block.content}</p>;
                 }
                 if (block._type === 'blockQuote') {
                     return (
                         <blockquote key={i} className="border-l-2 border-accent-blue pl-6 italic font-heading text-2xl">
                             "{block.text}"
                             {block.author && <footer className="text-sm font-mono mt-2 not-italic text-gray-500">— {block.author}</footer>}
                         </blockquote>
                     )
                 }
                 return null;
              })}
           </div>
        </div>
      </div>
    </div>
  );
}
