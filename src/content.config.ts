import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    modified: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().default(''),
    categories: z.array(z.string()).default([]),
    featured: z.string().default(''),
    wpId: z.number().optional(),
    titleZh: z.string().optional(),
    descriptionZh: z.string().optional(),
    bodyZh: z.string().optional(),
  }),
});

const listings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/listings' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    modified: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().default(''),
    categories: z.array(z.string()).default([]),
    featured: z.string().default(''),
    wpId: z.number().optional(),
    titleZh: z.string().optional(),
    descriptionZh: z.string().optional(),
    bodyZh: z.string().optional(),
  }),
});

const postsZh = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts-zh' }),
  schema: z.object({
    title: z.string(), date: z.string(), modified: z.string().optional(), slug: z.string().optional(),
    description: z.string().default(''), categories: z.array(z.string()).default([]),
    featured: z.string().default(''), wpId: z.number().optional(),
  }),
});

const listingsZh = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/listings-zh' }),
  schema: z.object({
    title: z.string(), date: z.string(), modified: z.string().optional(), slug: z.string().optional(),
    description: z.string().default(''), categories: z.array(z.string()).default([]),
    featured: z.string().default(''), wpId: z.number().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    slug: z.string().optional(),
    wpId: z.number().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    count: z.number().default(0),
    parent: z.number().default(0),
  }),
});

const listingCategories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/listing-categories' }),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    count: z.number().default(0),
    parent: z.number().default(0),
  }),
});

export const collections = { posts, postsZh, listings, listingsZh, pages, categories, listingCategories };
