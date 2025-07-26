<script setup>
const todayISO = new Date().toISOString().slice(0, 10);
const route = useRoute();
const {
  data: posts,
  pending,
  error,
} = await useAsyncData(route.path, () => {
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
useHead({
  title: "Agora Blog - Nachhilfe finden und anbieten",
});
useSeoMeta(
  {
    ogTitle: "Agora Blog - Nachhilfe finden und anbieten",
    description: "Agora Blog - Nachhilfe finden und anbieten",
    ogDescription: "Agora Blog - Hier findest du den passenden Kontakt für jedes Fach. Nachhilfe finden und anbieten",
    ogImage: "/media/main.jpg",
    twitterCard: "/media/main.jpg",

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
  <main v-else class="max-w-310 m-auto">
    <NavigationMain />
    <div class="mx-4 pt-4 posts-grid">
      <NuxtLink v-for="article in posts" :key="article.slug" :to="'/blog/' + article.slug" class="relative">
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
  </main>
  <Footer />
</template>

<style scoped>
.posts-grid > *:first-child {
  grid-column: 1 / -1;
}
.posts-grid > *:first-child > div {
  height: 500px;
}
.posts-grid > *:first-child h2 {
  font-family: "Lexend", Arial, sans-serif;
  font-size: 2.188rem;
  font-weight: 500;
  line-height: 120%;
}
.posts-grid {
  display: grid;
  /* always 3 columns of equal width */
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
@media (min-width: calc(250px * 3 + 2 * 2rem)) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
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
