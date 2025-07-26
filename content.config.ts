// content.config.js
import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection(
            asSitemapCollection({
                source: 'blog/*.md',
                type: 'page',

                schema: z.object({
                    title: z.string(),
                    description: z.string(),
                    slug: z.string(),
                    tags: z.array(z.string()),
                    thumbnail: z.string(),
                    thumbnail_full: z.string(),
                    thumbnail_alt: z.string(),
                    meta_title: z.string(),
                    meta_description: z.string(),
                    publication_date: z
                        .string()
                        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Use YYYY-MM-DD' })
                        .transform((s) => new Date(s))
                }),



            })
        )
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