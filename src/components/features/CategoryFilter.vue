<script setup lang="ts">
import { useProductsStore } from '@/stores/products.ts'

const productsStore = useProductsStore()

const select = (id: string) => {
  productsStore.setCategory(id)
}
</script>

<template>
  <div class="categories">
    <button
      :class="{ active: productsStore.selectedCategory === 'all' }"
      @click="select('all')"
    >
      All
    </button>

    <button
      v-for="c in productsStore.categories"
      :key="c.id"
      :class="{ active: productsStore.selectedCategory === c.id }"
      @click="select(c.id)"
    >
      {{ c.name }}
    </button>
  </div>
</template>

<style scoped>
.categories {
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0;
  padding-left: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text);
  cursor: pointer;
}

button.active {
  background: var(--selected);
  color: white;
  border-color: var(--selected);
}

button:hover {
  background: goldenrod;
  color: white;
  border-color: var(--selected);
}

@media (max-width: 768px) {
  .categories {
    display: grid;
    padding: 0.5rem;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>
