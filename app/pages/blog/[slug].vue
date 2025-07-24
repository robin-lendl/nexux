<template>
  <main class="min-w-80 max-w-350 mx-auto">
    <ContentDoc v-slot="{ doc }">
      <article class="mx-4">
        <div class="relative w-full h-100 rounded-32 overflow-hidden mb-8 mt-16">
          <img :src="doc.thumbnail" alt="Blog Thumbnail" class="w-full h-full object-cover absolute z-0" />
          <div class="gradient-blog h-full flex flex-col justify-end gap-2 px-12 pb-12 text-white relative z-10">
            <h5 class="style-h5 pb-2">{{ doc.publication_date }}</h5>
            <h1 class="style-h2">{{ doc.title }}</h1>
          </div>
        </div>
        <div class="max-w-200 mx-auto">
          <ContentRenderer class="markdown" :value="doc" />
        </div>
      </article>
    </ContentDoc>
  </main>
</template>
<style></style>
