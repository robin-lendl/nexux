<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1>{{ doc.title }}</h1>
        <p>{{ doc.publication_date }}</p>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>
