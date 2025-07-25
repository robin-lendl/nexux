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
                    //     publication_date: z
                    //         .string()
                    //         .refine((s) => !isNaN(Date.parse(s)), { message: 'Invalid date' })
                    //         .transform((s) => new Date(s))
                    // })
                    // publication_date: z.date()
                    // publication_date: z.string()
                    //     // enforce exactly DD-MM-YYYY
                    //     .regex(/^\d{2}-\d{2}-\d{4}$/, { message: 'Use DD-MM-YYYY' })
                    //     // transform into a JS Date(year, month-1, day)
                    //     .transform((s) => {
                    //         const [day, month, year] = s.split('-').map((n) => parseInt(n, 10))
                    //         return new Date(year, month - 1, day)
                    //     })
                    publication_date: z
                        .string()
                        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Use YYYY-MM-DD' })
                        .transform((s) => new Date(s))
                })

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