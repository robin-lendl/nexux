<script setup>
// Props in snake_case
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
});

import { computed } from "vue";

// Reactive computed value prefixed with _
const _formatted_date = computed(() =>
  props.publication_date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
);
</script>

<template>
  <NuxtLink :to="`/${post.slug}`" class="block hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-gray-200">
    <div class="p-4 flex flex-col h-full">
      <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
      <p class="text-gray-600 flex-1 mb-4">{{ post.description }}</p>
      <time class="text-sm text-gray-500">{{ _formatted_date }}</time>
    </div>
  </NuxtLink>
</template>
