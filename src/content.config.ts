// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const edu = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'edu.md' }),
  schema: z.object({
    title: z.string(),
    id: z.string(),
    items: z.array(z.object({
      school: z.string(),
      program: z.string(),
      dept: z.string(),
      advisor: z.string(),
      address: z.string(),
      dateStart: z.string(),
      dateEnd: z.string().optional(),
      gpa: z.string(),
      gpaMajor: z.string(),
    })),
  }),
});

const work = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'work.md' }),
  schema: z.object({
    sections: z.array(z.object({
      title: z.string(),
      id: z.string(),
      sections: z.array(z.object({
        title: z.string(),
        id: z.string(),
        items: z.array(z.object({
          job: z.string(),
          team: z.string().optional(),
          advisor: z.string().optional(),
          company: z.string(),
          address: z.string(),
          dateStart: z.string(),
          dateEnd: z.string(),
          description: z.array(z.string()).optional()
        })),
      })),
    })),
  }),
});

const award = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'award.md' }),
  schema: z.object({
    sections: z.array(z.object({
      title: z.string(),
      id: z.string(),
      items: z.array(z.object({
        title: z.string(),
        inst: z.string(),
        address: z.string(),
        dateStart: z.string(),
        dateEnd: z.string().optional(),
        description: z.string().optional()
      })),
    })),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { edu, work, award };
