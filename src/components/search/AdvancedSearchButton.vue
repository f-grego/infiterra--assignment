<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  open: Boolean
})
const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="btn-wrapper">
    <button class="toggle-btn" @click="emit('toggle')">
      {{ props.open ? 'Hide Advanced Search' : 'Advanced Search' }}
    </button>
  </div>
</template>

<style scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem 1rem 0;
}

.toggle-btn {
  padding: 0.6rem 1.2rem;
  background: var(--qty-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  color: var(--text);
  font-weight: 500;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.toggle-btn:hover {
  background: var(--selected);
  color: white;
  border-color: var(--selected);
}

@media (max-width: 768px) {
  .toggle-btn {
    margin-left: 1.8rem;
  }
}
</style>