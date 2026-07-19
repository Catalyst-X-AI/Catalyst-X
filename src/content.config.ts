import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    navGroup: z.enum(['foundations', 'ai-era', 'for-you', 'none']).default('none'),
    navLabel: z.string().optional(),
    navOrder: z.number().default(0),
    eyebrow: z.string().default('Catalyst X'),
    heroStyle: z.enum(['navy', 'warm']).default('navy'),
    lede: z.string(),
    cardBlurb: z.string().optional(),
    statTiles: z
      .array(z.object({ number: z.string(), label: z.string() }))
      .default([]),
    callouts: z.array(z.string()).default([]),
    gentleNote: z.string().optional(),
    sources: z
      .array(z.object({ label: z.string(), url: z.string().optional() }))
      .default([]),
    showInNav: z.boolean().default(true),
  }),
});

export const collections = { pages };
