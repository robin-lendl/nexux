<script setup>
const props = defineProps({
  time: {
    type: String,
    required: true,
  },
  markNew: {
    type: Boolean,
    default: false,
  },
});
const markNew = computed(() => {
  const msPerDay = 24 * 60 * 60 * 1000;

  // heutiger 00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Datum des Artikels auf 00:00 zurücksetzen
  const articleDate = new Date(props.time);
  articleDate.setHours(0, 0, 0, 0);

  const diffDays = (today - articleDate) / msPerDay;
  return diffDays >= 0 && diffDays <= 2;
});

// function formatGerman(raw) {
//   // raw is "2025-07-01" (ISO)
//   const dt = new Date(raw);
//   return dt
//     .toLocaleDateString("de-DE", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     })
//     .replace(/\./g, "_");
// }
// Computed für die formatierte Anzeige
const formattedDate = computed(() => {
  const dt = new Date(props.time);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${dd}_${mm}_${yyyy}`;
});

// Computed für das ISO-Attribut
const isoDate = computed(() => new Date(props.time).toISOString());
</script>
<template>
  <div class="flex items-center">
    <div v-if="markNew" class="dot-wrapper mr-2">
      <span class="dot-solid"></span>
      <span class="dot-pulse"></span>
    </div>
    <time :datetime="isoDate" :class="['time', { 'color-text-disabled': !markNew, 'text-brand': markNew }]">{{ formattedDate }}</time>
  </div>
</template>

<style scoped>
.time {
  font-family: "Space Mono", Arial, sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 100%;
  text-decoration: none;
}

.time::before {
  content: "[";
  padding-right: 0.3rem;
}
.time::after {
  content: "]";
  padding-left: 0.3rem;
}

.dot-wrapper {
  position: relative;
  width: 0.5rem;
  height: 0.5rem;
}

/* Der feste Punkt */
.dot-solid {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--state-solid);
  z-index: 2;
}

/* Die wachsende Welle */
.dot-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--state-transparent);
  transform: translate(-50%, -50%) scale(1);
  z-index: 1;
  animation: pulse 1.5s ease-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.5);
  }
}
</style>
