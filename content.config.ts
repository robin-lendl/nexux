// content.config.js
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

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
                thumbnail: z.string(),
                publication_date: z
                    .string()
                    .refine((s) => !isNaN(Date.parse(s)), { message: 'Invalid date' })
                    .transform((s) => new Date(s))
            })
        })
    }
})
// import { defineCollection, defineContentConfig } from '@nuxt/content'

// export default defineContentConfig({
//     collections: {
//         docs: defineCollection({
//             // Load every file inside the `content` directory
//             source: '**',
//             // Specify the type of content in this collection
//             type: 'page'
//         })
//     }
// })