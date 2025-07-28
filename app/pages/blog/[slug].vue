<script setup>
const route = useRoute();
const _todayISO = new Date().toISOString().slice(0, 10);

// fetch exactly one document matching this route’s path
const { data: page, pending, error } = await useAsyncData(route.path, () => queryCollection("blog").path(route.path).first());

if (error.value) {
  throw createError({ statusCode: 500, statusMessage: error.value.message });
}
if (!page.value || page.value.publication_date > _todayISO) {
  throw createError({ statusCode: 404 });
}

useHead({
  title: page.value.title + " - Agora Blog",
});
useSeoMeta(
  {
    ogTitle: page.value.meta_title,
    description: page.value.description,
    ogDescription: page.value.meta_description,
    ogImage: page.value.thumbnail_full,
    twitterCard: page.value.thumbnail_full,

    // robots
    // robots: "index, follow",

    // additional head tags
    link: [{ rel: "sitemap", type: "application/xml", href: "/sitemap.xml" }],
  },
  { priority: 1 }
);
</script>

<template>
  <div v-if="pending">Loading posts…</div>
  <main v-else class="min-w-80 max-w-310 mx-auto">
    <NavigationMain />
    <article class="mx-4 pt-4">
      <div class="relative w-full h-50 rounded-32 overflow-hidden">
        <img :src="page.thumbnail_full" :alt="page.thumbnail_alt" class="w-full h-full object-cover absolute z-0" />
        <div class="h-full flex flex-col justify-end gap-3 px-12 pb-12 text-white relative z-10">
          <AppTime :time="page.publication_date" />
          <h1 class="style-h2">{{ page.title }}</h1>
        </div>
      </div>
      <div class="max-w-200 mx-auto py-16">
        <ContentRenderer class="markdown" :value="page" />
      </div>
    </article>
    <a href="https://blog.agora-nachhilfe.de" class="btn text-body">Zur Übersicht</a>
  </main>
  <div class="flex flex-col gap-4 py-16 w-full">
    <div class="max-w-310 mx-auto">
      <RelevantPosts />
    </div>
  </div>
  <Footer />
</template>
<style></style>
