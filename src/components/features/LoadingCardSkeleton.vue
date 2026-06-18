<template>
  <div v-for="n in 8" :key="n" class="card skeleton-card">
    <div class="skeleton skeleton-image"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-price"></div>
    <div class="skeleton skeleton-button"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.skeleton-card {
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(0,0,0,0.04) 0%,
    rgba(0,0,0,0.08) 50%,
    rgba(0,0,0,0.04) 100%
  );
}

:root.dark .skeleton {
  background: linear-gradient(90deg,
  rgba(255,255,255,0.05) 0%,
  rgba(255,255,255,0.12) 50%,
  rgba(255,255,255,0.05) 100%
  );
}

.skeleton-image {
  height: 260px;
  border-radius: 10px;
}

.skeleton-title {
  height: 18px;
  width: 70%;
}

.skeleton-text {
  height: 14px;
  width: 90%;
}

.skeleton-price {
  height: 16px;
  width: 40%;
}

.skeleton-button {
  height: 42px;
  width: 100%;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>