<script setup>
const route = useRoute();
// fetch exactly one document matching this route’s path
const {
  data: page,
  pending,
  error,
} = await useAsyncData(route.path, () =>
  queryCollection("blog")
    .path(route.path) // finds content/blog/<slug>.md
    .first()
);
// if (page.value?.ogImage) {
//   defineOgImage(page.value?.ogImage); // <-- Nuxt OG Image
// }
// Ensure the schema.org is rendered
// useHead(page.value.head || {}); // <-- Nuxt Schema.org
// useSeoMeta(page.value.seo || {}); // <-- Nuxt Robots
// Merge into <head> reactively
useHead({
  title: page.value.title,
  meta: [
    { name: "description", content: page.value.description },
    { property: "og:title", content: page.value.title },
    { property: "og:site_name", content: page.value.title + " - Agora Blog" },
    { property: "og:description", content: page.value.description },
    { property: "og:image", content: page.value.thumbnail },
    { name: "twitter:image", content: page.value.thumbnail },
    { property: "og:type", content: "article" },
    { name: "article:published_time", content: page.value.publication_date.toString() },
  ],
  link: [{ rel: "canonical", href: `https://your-domain.com${route.path}` }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: page.value.title,
        datePublished: page.value.publication_date,
        image: page.value.thumbnail,
        description: page.value.description,
      }),
    },
  ],
});
</script>

<template>
  <div v-if="pending">Loading posts…</div>
  <main v-else class="min-w-80 max-w-350 mx-auto">
    <article class="mx-4">
      <div class="relative w-full h-100 rounded-32 overflow-hidden mb-8 mt-16">
        <img :src="page.thumbnail" alt="Blog Thumbnail" class="w-full h-full object-cover absolute z-0" />
        <div class="gradient-blog h-full flex flex-col justify-end gap-2 px-12 pb-12 text-white relative z-10">
          <h5 class="style-h5 pb-2">{{ page.publication_date }}</h5>
          <h1 class="style-h2">{{ page.title }}</h1>
        </div>
      </div>
      <div class="max-w-200 mx-auto">
        <ContentRenderer class="markdown" :value="page" />
      </div>
    </article>
  </main>
</template>
<style></style>
