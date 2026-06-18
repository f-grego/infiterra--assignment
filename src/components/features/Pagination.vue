<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductsStore } from '@/stores/products.ts'
import IconSvg from '@/components/icons/IconSvg.vue'
import { PER_PAGE_OPTIONS } from '@/constants/index.ts'

const store = useProductsStore()

const perPageOptions = ref<{ value: number; label: string}[]>(PER_PAGE_OPTIONS)

const goTo = (page: number) => {
  if (page >= 1 && page <= store.totalPages) {
    store.setPage(page)
  }
}

const middlePages = computed(() => {
  const pages = []
  const start = Math.max(2, store.currentPage - 1)
  const end = Math.min(store.totalPages - 1, store.currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<template>
  <div class="pagination-wrapper">

    <div class="pagination" v-if="store.totalPages > 1">

      <button
        @click="goTo(store.currentPage - 1)"
        :disabled="store.currentPage === 1"
        class="arrow-btn"
      >
        <icon-svg name="arrow-left" />
      </button>

      <button
        :class="{ active: store.currentPage === 1 }"
        @click="goTo(1)"
      >
        1
      </button>

      <span v-if="store.currentPage > 3" class="dots">…</span>

      <button
        v-for="page in middlePages"
        :key="page"
        :class="{ active: store.currentPage === page }"
        @click="goTo(page)"
      >
        {{ page }}
      </button>

      <span v-if="store.currentPage < store.totalPages - 2" class="dots">…</span>

      <button
        v-if="store.totalPages > 1"
        :class="{ active: store.currentPage === store.totalPages }"
        @click="goTo(store.totalPages)"
      >
        {{ store.totalPages }}
      </button>

      <button
        @click="goTo(store.currentPage + 1)"
        :disabled="store.currentPage === store.totalPages"
        class="arrow-btn"
      >
        <icon-svg name="arrow-right" />
      </button>

    </div>

    <div class="per-page">
      <label>Per page:</label>
      <select v-model="store.itemsPerPage" @change="store.setPage(1)">
        <option v-for="option in perPageOptions" :key="option.label" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

  </div>
</template>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-bottom: 2.5rem;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
}

button {
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

button:hover:not(:disabled) {
  border-color: white;
  color: white;
  background-color: goldenrod!important;
  transform: translateY(-2px);
}

button.active {
  background: var(--selected);
  color: white;
  border-color: var(--selected);
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dots {
  opacity: 0.5;
  padding: 0 0.3rem;
}

.per-page {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.per-page label {
  font-size: 0.9rem;
  opacity: 0.7;
}

.per-page select {
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.per-page select:hover {
  border-color: var(--selected);
}

.arrow-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.55rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.arrow-btn:hover:not(:disabled) {
  border-color: var(--selected);
  color: var(--selected);
  transform: translateY(-2px);
}

.arrow-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .pagination-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .per-page {
    justify-content: center;
  }
}

</style>
