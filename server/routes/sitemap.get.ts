import { defineEventHandler } from 'h3'
import { queryCollection } from '#imports'   // ← auto-imported for you

export default defineEventHandler(async () => {
    const todayISO = new Date().toISOString().slice(0, 10);

    // `queryCollection(event, 'blog')` is the exact server API
    const posts = await queryCollection('blog')
        .where("publication_date", "<=", todayISO)
        .all()
    console.log("Sitemap posts:", posts)

    return posts.map(p => `/blog/${p.slug}`)
})