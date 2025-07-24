// content.config.js
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            source: 'blog/*.md',
            type: 'page',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                slug: z.string(),
                tags: z.array(z.string()),
                image: z.string(),
                publication_date: z
                    .string()
                    .refine((s) => !isNaN(Date.parse(s)), { message: 'Invalid date' })
                    .transform((s) => new Date(s))
            })
        })
    }
})