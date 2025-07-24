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
