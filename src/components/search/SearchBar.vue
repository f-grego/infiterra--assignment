<script setup lang="ts">
import { useProductsStore } from '@/stores/products.ts'

const productsStore = useProductsStore()

const update = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  productsStore.setSearch(value)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search products..."
      @input="update"
    />
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
input {
  width: 60%;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--qty-bg-light);
  color: var(--text);
}
</style>
