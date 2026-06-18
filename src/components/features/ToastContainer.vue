<script setup lang="ts">
import { useToastStore } from '@/stores/toast.ts'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast-container">
    <div
      v-for="t in toastStore.toasts"
      :key="t.id"
      class="toast"
      :class="t.type"
    >
      {{ t.message }}
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.toast {
  padding: 12px 18px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
}

.toast.success { background: #2ecc71 }
.toast.error { background: #e74c3c }
.toast.info { background: #3498db }

@keyframes slideIn {
  from { transform: translateX(120%); opacity: 0 }
  to { transform: translateX(0); opacity: 1 }
}

@keyframes fadeOut {
  to { opacity: 0; transform: translateX(120%) }
}
</style>
