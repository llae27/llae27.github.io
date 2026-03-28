// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const about = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'about.md' }),
  schema: z.object({
    metatitle: z.string(),
    email: z.string(),
    github: z.string().optional(),
    webpage: z.string().optional(),
    orcid: z.string().optional(),
    gscholar: z.string().optional(),
  }),
});

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

const publication = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'publication.md' }),
  schema: z.object({
    title: z.string(),
    id: z.string(),
    items: z.array(z.object({
      bibtex: z.string(),
      type: z.string(),
      first: z.int().optional(),
      award: z.string().optional(),
    })),
  }),
});

const orcid = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'orcid.md' }),
  schema: z.object({
    showpreprint: z.boolean(),
    override: z.record(z.string(), z.object({
      first: z.int().optional(),
      award: z.string().optional(),
    })).optional(),
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

const skills = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'skills.md' }),
  schema: z.object({
    sections: z.array(z.object({
      title: z.string(),
      id: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    })),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { about, edu, publication, orcid, work, award, skills };
