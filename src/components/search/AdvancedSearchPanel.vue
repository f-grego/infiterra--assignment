<script setup lang="ts">
import { defineProps } from 'vue'
import CategoryFilter from '../features/CategoryFilter.vue'
import SortOptions from '../features/SortOptions.vue'

const props = defineProps({
  open: Boolean
})
</script>

<template>
  <div v-if="props.open" class="advanced-search">
    <div class="panel" :class="{ open: props.open }">
      <div class="grid">

        <div class="section">
          <h4>Category</h4>
          <CategoryFilter />
        </div>

        <div class="section">
          <h4>Sorting</h4>

          <SortOptions placeholder="Sort by..." />

          <p class="hint">
            Sorting helps you organize products by price, rating or name.
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.advanced-search {
  margin: 1rem 0 1.5rem;
}

.panel {
  margin: 1rem;
  background: rgba(193, 192, 192, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0 1.2rem;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.25s ease;
}

:root.dark .panel {
  background: rgba(20,20,20,0.6);
}

.panel.open {
  padding: 1.2rem;
  max-height: 500px;
  opacity: 1;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section h4 {
  margin-bottom: 0.4rem;
  font-size: 1rem;
  color: var(--text);
}

.hint {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 0.4rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
