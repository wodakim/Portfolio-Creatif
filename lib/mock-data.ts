// Mock data simulating Sanity.io response structure

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  description: string;
  tags: string[];
  blocks: ContentBlock[];
}

export type ContentBlock =
  | { _type: 'blockImage'; image: { asset: { url: string }; alt: string }; caption?: string }
  | { _type: 'blockText'; content: string } // Simple portable text simulation
  | { _type: 'blockVideo'; url: string; caption?: string }
  | { _type: 'blockQuote'; text: string; author?: string };

export const projects: Project[] = [
  {
    _id: '1',
    title: 'Neon Genesis',
    slug: { current: 'neon-genesis' },
    mainImage: {
      asset: { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
      alt: 'Neon city landscape'
    },
    description: 'A cyberpunk exploration of urban decay and digital rebirth.',
    tags: ['WebGL', 'React', 'Three.js'],
    blocks: [
      { _type: 'blockText', content: 'The project started as a simple experiment in shaders...' },
      { _type: 'blockImage', image: { asset: { url: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1974&auto=format&fit=crop' }, alt: 'Code interface' } },
    ]
  },
  {
    _id: '2',
    title: 'Void Walker',
    slug: { current: 'void-walker' },
    mainImage: {
      asset: { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2011&auto=format&fit=crop' },
      alt: 'Space nebula'
    },
    description: 'An interactive journey through the cosmos using data visualization.',
    tags: ['D3.js', 'Next.js', 'Framer Motion'],
    blocks: [
      { _type: 'blockQuote', text: 'In space, no one can hear you debug.', author: 'Unknown Dev' },
    ]
  },
  {
    _id: '3',
    title: 'Glitch Protocol',
    slug: { current: 'glitch-protocol' },
    mainImage: {
      asset: { url: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?q=80&w=2070&auto=format&fit=crop' },
      alt: 'Glitch art abstract'
    },
    description: 'Distorting reality through algorithmic generation.',
    tags: ['Canvas', 'Generative Art', 'Typescript'],
    blocks: []
  }
];

export const about = {
  name: 'LogoLoom',
  role: 'Creative Developer',
  bio: 'Crafting digital experiences that bridge the gap between art and code. Obsessed with micro-interactions and immersive storytelling.',
  stats: {
    linesOfCode: '1.2M+',
    coffeesConsumed: '∞',
    bugsFixed: '404',
    yearsActive: '5'
  },
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
};

/*
  SANITY SCHEMA DRAFT:

  // project.js
  export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'slug', type: 'slug', options: { source: 'title' } },
      { name: 'mainImage', type: 'image', options: { hotspot: true } },
      { name: 'description', type: 'text' },
      { name: 'tags', type: 'array', of: [{ type: 'string' }] },
      {
        name: 'blocks',
        type: 'array',
        of: [
          { type: 'blockImage' },
          { type: 'blockText' },
          { type: 'blockVideo' },
          { type: 'blockQuote' }
        ]
      }
    ]
  }

  // blockImage.js (Object)
  // blockText.js (Object or Portable Text)
  // ...
*/
