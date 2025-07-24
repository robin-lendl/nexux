<script setup>
const {
  data: posts,
  pending,
  error,
} = await useAsyncData(
  "blog-list",
  () => queryCollection("blog").all() // fetch all matching docs  [oai_citation:1‡Nuxt Content](https://content.nuxt.com/docs/utils/query-collection)
);
</script>

<template>
  <div v-if="pending">Loading posts…</div>
  <main v-else class="max-w-350 m-auto mt-16">
    <div class="mx-4 posts-grid">
      <NuxtLink v-for="article in posts" :key="article.slug" :to="'/blog/' + article.slug" class="relative">
        <div class="relative w-full h-80 rounded-32 overflow-hidden min-w-80">
          <img :src="article.thumbnail" alt="Blog Thumbnail" class="w-full h-full object-cover absolute z-0" />
          <div class="gradient-blog h-full flex flex-col justify-end gap-2 px-12 pb-12 text-white relative z-10">
            <h5 class="style-h5 pb-2">{{ article.publication_date }}</h5>
            <h2 class="style-h4">{{ article.title }}</h2>
          </div>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<style>
.posts-grid {
  display: grid;
  /* always 3 columns of equal width */
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
</style>
<!-- <script setup></script>

<template>
  <main class="max-w-350 m-auto mt-16">
    <div class="posts-grid mx-4">
      <ContentList path="/blog" v-slot="{ list }">
        <NuxtLink class="relative" :to="'/blog/' + article.slug" v-for="article in list" :key="article._path">
          <div class="relative w-full h-80 rounded-32 overflow-hidden min-w-80">
            <img :src="article.thumbnail" alt="Blog Thumbnail" class="w-full h-full object-cover absolute z-0" />
            <div class="gradient-blog h-full flex flex-col justify-end gap-2 px-12 pb-12 text-white relative z-10">
              <h5 class="style-h5 pb-2">{{ article.publication_date }}</h5>
              <h2 class="style-h4">{{ article.title }}</h2>
            </div>
          </div>
        </NuxtLink>
      </ContentList>
    </div>
  </main>
</template>

<style>
.posts-grid {
  display: grid;
  /* always 3 columns of equal width */
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
</style> -->
