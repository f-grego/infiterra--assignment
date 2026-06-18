<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  line: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="stock-left">
    <span v-if="props.line === 0">Out of stock</span>
    <span v-else-if="props.line === 1">1 left</span>
    <span v-else-if="props.line < 3">{{ line }} left</span>
  </div>
</template>

<style scoped>
.stock-left {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.8;
  margin-top: 0.3rem;
}

.stock-left span {
  color: var(--popup-text);
}

.stock-left span:first-child {
  color: #dc2626; /* red for out of stock */
}

.stock-left span:nth-child(2) {
  color: #d97706; /* amber for low stock */
}
</style>