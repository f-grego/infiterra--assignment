<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './search/SearchBar.vue'
import Pagination from '@/components/features/Pagination.vue'
import AdvancedSearchButton from '@/components/search/AdvancedSearchButton.vue'
import AdvancedSearchPanel from '@/components/search/AdvancedSearchPanel.vue'
import ProductCard from '@/components/ProductCard.vue'
const advancedOpen = ref(false)
</script>

<template>
  <div class="search-row">
    <SearchBar />

    <div class="advanced-btn-wrapper">
      <AdvancedSearchButton :open="advancedOpen" @toggle="advancedOpen = !advancedOpen" />
    </div>
  </div>

  <AdvancedSearchPanel :open="advancedOpen" />

  <ProductCard />

  <Pagination />
</template>

<style scoped>
.search-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.search-row > *:first-child {
  flex: 1;
}

.advanced-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
}

@media (max-width: 768px) {
  .advanced-btn-wrapper {
    width: 100%;
    justify-content: center;
  }
}
</style>
