<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isNavOut = ref(false);
let lastScrollY = 0;

function onScroll() {
  const currentY = window.scrollY || 0;
  // if scrolled down, hide the nav
  if (currentY > lastScrollY) {
    isNavOut.value = true;
  } else {
    isNavOut.value = false;
  }
  lastScrollY = currentY;
}

onMounted(() => {
  lastScrollY = window.scrollY || 0;
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
<template>
  <nav :class="['bg-dark p-4 sticky top-0 z-200 transition-transform duration-500 ease-in-out', isNavOut ? 'nav-out' : 'nav-in']">
    <div class="flex items-center justify-between gap-8 rounded-16 p-4">
      <a href="https://agora-nachhilfe.de/">
        <img src="/nexux-logo-name.svg" alt="Nexux Logo" class="h-8" />
      </a>

      <div class="flex gap-2">
        <NuxtLink class="btn btn-nav" to="/">Artikel</NuxtLink>
        <NuxtLink class="btn btn-disabled" to="">Datenbank</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: var(--btn-text-active);
  background-color: var(--btn-bg-active);
}

.nav-in {
  transform: translateY(0);
}

.nav-out {
  transform: translateY(-100%);
}
</style>
