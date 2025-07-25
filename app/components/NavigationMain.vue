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
  <header :class="['p-4 sticky top-0 z-200 transition-transform duration-500 ease-in-out', isNavOut ? 'nav-out' : 'nav-in']">
    <div class="flex items-center justify-between gap-8 rounded-16 p-4 bg-dark">
      <a href="https://agora-nachhilfe.de/">
        <img src="/logo-name-light-agora-nachhilfe.svg" alt="Agora Nachhilfe Logo" class="h-8" />
      </a>

      <div class="flex gap-2">
        <div class="hidden md:block"><a class="btn btn-nav" href="https://agora-nachhilfe.de/nachhilfe-anfragen">Ich suche</a></div>
        <div class="hidden md:block"><a class="btn btn-nav" href="https://agora-nachhilfe.de/partner-werden">Nachhilfe anbieten</a></div>
        <a class="btn btn-white" href="https://anfrage.agora-nachhilfe.de/">Nachhilfe anfragen</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* .nav-in {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}
.nav-out {
  transform: translate3d(0px, -150%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
} */

.nav-in {
  transform: translateY(0);
}

.nav-out {
  transform: translateY(-100%);
}
</style>
