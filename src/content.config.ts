// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

const BaseItemSchema = z.object({
  title: z.string(),
  id: z.string().optional(),
  description: z.string().optional(),
});

const BasicSectionSchema = BaseItemSchema.extend({
  items: z.array(BaseItemSchema).optional(),
});

const DateItemSchema = z.object({
  address: z.string(),
  dateStart: z.string(),
  dateEnd: z.string().optional(),
});

const FunItemSchema = BaseItemSchema.extend({
  year: z.int().optional(),
  month: z.int().optional(),
  day: z.int().optional(),
  address: z.string().optional(),
  record: z.string().optional(),
  like: z.string().optional(),
  dislike: z.string().optional(),
  curious: z.string().optional(),
  award: z.string().optional(),
});

const FunSectionSchema = BaseItemSchema.extend({
  id: z.string(),
  items: z.array(FunItemSchema).optional(),
});

const PubSchema = z.object({
  first: z.int().optional(),
  award: z.string().optional(),
});

// 4. Define a `loader` and `schema` for each collection
const about = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'about.md' }),
  schema: z.object({
    email: z.string(),
    github: z.string().optional(),
    webpage: z.string().optional(),
    orcid: z.string().optional(),
    gscholar: z.string().optional(),
  }),
});

const edu = defineCollection({
  loader: glob({ base: './src/content', pattern: 'edu.md' }),
  schema: BaseItemSchema.extend({
    items: z.array(DateItemSchema.extend({
      school: z.string(),
      program: z.string(),
      dept: z.string(),
      advisor: z.string(),
      gpa: z.string(),
      gpaMajor: z.string(),
    })),
  }),
});

const publication = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'publication.md' }),
  schema: BaseItemSchema.extend({
    items: z.array(PubSchema.extend({
      bibtex: z.string(),
      type: z.string(),
    })),
  }),
});

const orcid = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'orcid.md' }),
  schema: z.object({
    showpreprint: z.boolean(),
    override: z.record(z.string(), PubSchema).optional(),
  }),
});

const work = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'work.md' }),
  schema: z.object({
    sections: z.array(BaseItemSchema.extend({
      sections: z.array(BaseItemSchema.extend({
        items: z.array(DateItemSchema.extend({
          job: z.string(),
          team: z.string().optional(),
          advisor: z.string().optional(),
          company: z.string(),
          description: z.array(z.string()).optional()
        }))
      }))
    })),
  }),
});

const award = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'award.md' }),
  schema: z.object({
    sections: z.array(BaseItemSchema.extend({
      items: z.array(DateItemSchema.extend({
        title: z.string(),
        inst: z.string(),
        description: z.string().optional()
      })),
    })),
  }),
});

const skills = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'skills.md' }),
  schema: z.object({
    sections: z.array(BasicSectionSchema),
  }),
});

const fun = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'fun.md' }),
  schema: BaseItemSchema.extend({
    like: z.object({
      title: z.string(),
      items: z.array(z.string())
    }).optional(),
    dislike: z.object({
      title: z.string(),
      items: z.array(z.string())
    }).optional(),
    sections: z.array(FunSectionSchema).optional(),
  }),
});

const visit = defineCollection({
  // loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: './src/content', pattern: 'visit.md' }),
  schema: BaseItemSchema.extend({
    sections: z.array(FunSectionSchema).optional(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { about, edu, publication, orcid, work, award, skills, fun, visit };
