<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composables/useToast'
import IconSvg from '@/components/icons/IconSvg.vue'
import StockLeftIndicator from '@/components/features/StockLeftIndicator.vue'

const cartStore = useCartStore()
const emit = defineEmits(['close'])

const isVisible = ref(false)

const toast = useToast()
const removeItem = (id: string) => {
  cartStore.removeFromCart(id)
  toast.info('Item removed from cart')
}

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

const closePopup = () => {
  isVisible.value = false
  setTimeout(() => emit('close'), 300)
}

const increase = (id: string) => {
  const line = cartStore.lines.find(l => l.product.id === id)
  if (!line) return

  if (line.product.stock > 0) {
    cartStore.addToCart(id, 1)
  }
}

const decrease = (id: string) => {
  const item = cartStore.items.find(i => i.productId === id)
  if (!item) return

  if (item && item.quantity > 1) {
    cartStore.setQuantity(id, item.quantity - 1)
  } else {
    cartStore.removeFromCart(id)
    toast.info('Item removed from cart')
  }
}
</script>

<template>
  <div
    class="overlay"
    :class="{ show: isVisible }"
    @click.self="closePopup"
  >
    <div class="popup" :class="{ open: isVisible }">
      <h2>Your Basket</h2>

      <div v-if="cartStore.totalItems === 0">
        <p>Your basket is empty</p>
      </div>

      <div v-else>
        <div
          v-for="line in cartStore.lines"
          :key="line.product.id"
          class="item"
        >
          <img :src="line.product.images[0]" class="thumb"  alt=""/>

          <div class="info">
            <h4>{{ line.product.title }}</h4>
            <p>{{ line.product.price.toFixed(2) }} €</p>

            <div class="qty">
              <button @click="decrease(line.product.id)">−</button>
              <span>{{ line.quantity }}</span>
              <button
                @click="increase(line.product.id)"
                :disabled="line.product.stock === 0"
              >
                +
              </button>

              <StockLeftIndicator :line="line.product.stock" />
            </div>
          </div>

          <button class="delete-btn" @click="removeItem(line.product.id)">
            <icon-svg name="remove-item" />
          </button>
        </div>

        <hr />

        <h3>Total: {{ cartStore.totalPrice.toFixed(2) }} €</h3>
      </div>

      <button class="close-btn" @click="closePopup">Close</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  top: 4rem;
  background: rgba(0,0,0,0);
  display: flex;
  justify-content: flex-end;
  transition: background 0.3s ease;
  z-index: 999;
}
.overlay.show {
  background: rgba(0,0,0,0.55);
}

.popup {
  width: 380px;
  background: var(--popup-bg);
  color: var(--popup-text);
  padding: 1.5rem;
  height: 100%;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(.25,.8,.25,1);
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
}
.popup.open {
  transform: translateX(0);
}

.item {
  position: relative;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid var(--popup-border);
  padding-bottom: 1rem;
}
.thumb {
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;
}
.qty {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.qty button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.delete-btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  transform: translateY(5px);
  background: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--popup-text);
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.delete-btn:hover {
  opacity: 1;
  transform: translateY(5px) scale(1.15);
  color: #970000;
}

.close-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.7rem;
  background: var(--close-bg);
  color: var(--close-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .overlay {
    justify-content: center;
    align-items: flex-end;
    top: 0;
  }

  .popup {
    width: 100%;
    height: 82%;
    border-radius: 22px 22px 0 0;
    transform: translateY(100%);
    padding: 1.5rem;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(18px);
    box-shadow: 0 -4px 20px rgba(0,0,0,0.25);
  }

  :root.dark .popup {
    background: rgba(20,20,20,0.75);
    backdrop-filter: blur(18px);
  }

  .popup.open {
    transform: translateY(0);
  }

  .delete-btn {
    font-size: 1.5rem;
  }
}
</style>
