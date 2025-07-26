<script setup>
const todayISO = new Date().toISOString().slice(0, 10);
const route = useRoute();
const currentSlug = route.params.slug;
const {
  data: posts,
  pending,
  error,
} = await useAsyncData("relevant-posts", () => {
  return queryCollection("blog").where("publication_date", "<=", todayISO).order("publication_date", "DESC").all();
});

function formatGerman(raw) {
  // raw is "2025-07-01" (ISO)
  const dt = new Date(raw);
  return dt.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const filteredPosts = computed(
  () => (posts.value ?? []).filter((p) => p.slug !== currentSlug).slice(0, 3) // take only the first 3 items
);
</script>

<template>
  <div v-if="pending">Loading posts…</div>
  <div v-else class="mx-4 posts-grid">
    <NuxtLink v-for="article in filteredPosts" :key="article.slug" :to="'/blog/' + article.slug" class="relative">
      <div class="relative w-full h-80 rounded-32 overflow-hidden">
        <img :src="article.thumbnail" alt="Blog Thumbnail" class="w-full h-full object-cover absolute z-0" />
        <div class="gradient-blog h-full flex flex-col justify-end gap-2 px-12 pb-12 text-white relative z-10">
          <time :datetime="new Date(article.publication_date).toISOString()">
            {{ formatGerman(article.publication_date) }}
          </time>
          <h2 class="style-h4">{{ article.title }}</h2>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
@media (min-width: calc(250px * 3 + 2 * 2rem)) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
