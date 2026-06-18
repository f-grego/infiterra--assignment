<script setup lang="ts">
import { useProductsStore } from '@/stores/products.ts'
import { SORT_BY_OPTIONS } from '@/constants/index.ts'
import { ref } from 'vue'

const sorting = ref<{ value: string; label: string}[]>(SORT_BY_OPTIONS)

const productsStore = useProductsStore()
</script>

<template>
  <div class="sort-box">
    <select id="sorting" v-model="productsStore.sortBy">
      <option v-for="option in sorting" :key="option.label" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.sort-box {
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
}

select {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: goldenrod!important;
  color: var(--text);
}
</style>
