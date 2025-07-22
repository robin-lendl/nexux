<script setup>
// const { data: _post_list } = await useAsyncData("blog", () => queryCollection("blog").all());
</script>

<template>
  <main>
    <ContentList path="/blog" v-slot="{ list }">
      <NuxtLink :to="'/blog/' + article.slug" v-for="article in list" :key="article._path">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
      </NuxtLink>
    </ContentList>
  </main>
</template>
