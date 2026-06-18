<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products.ts'
import { useCartStore } from '@/stores/cart.ts'
import ProductViewLoadingSkeleton from '@/components/features/loading/ProductViewLoadingSkeleton.vue'


const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const toast = useToast()

const productId = route.params.id as string
const product = computed(() => productsStore.getById(productId))

const selectedColor = ref<string | null>(null)
const selectedSize = ref<string | null>(null)

const canAddToCart = computed(() => {
  if (!product.value) return false
  if (product.value.variants?.color && !selectedColor.value) return false
  return !(product.value.variants?.size && !selectedSize.value);

})

const addToCart = () => {
  if (!product.value) return
  cartStore.addToCart(product.value.id, 1)
  toast.success('Product added to basket!')
}

const stockStatus = computed(() => {
  if (!product.value) return null
  const s = product.value.stock

  if (s === 0) return 'out'
  if (s === 1) return 'last'
  if (s < 5) return 'low'
  return 'ok'
})
</script>

<template>
  <div v-if="productsStore.isLoading">
    <ProductViewLoadingSkeleton />
  </div>

  <div v-else-if="!product" class="not-found">
    Product not found
  </div>

  <div v-else class="details">
    <div class="image-box">
      <img :src="product.images[0]" class="main-img"  alt=""/>
    </div>

    <div class="info">
      <h1>{{ product.title }}</h1>
      <p class="desc">{{ product.description }}</p>

      <h2 class="price">{{ product.price.toFixed(2) }} €</h2>

      <div class="stock-status" :class="stockStatus">
        <span v-if="stockStatus === 'out'">Out of stock</span>
        <span v-else-if="stockStatus === 'last'">Last piece!</span>
        <span v-else-if="stockStatus === 'low'">Low stock</span>
      </div>

      <div v-if="product.variants" class="variants">
        <div v-if="product.variants.color">
          <h4>Color</h4>
          <div class="options">
            <button
              v-for="c in product.variants.color"
              :key="c"
              :class="{ active: selectedColor === c }"
              @click="selectedColor = c"
            >
              {{ c }}
            </button>
          </div>
        </div>

        <div v-if="product.variants.size">
          <h4>Size</h4>
          <div class="options">
            <button
              v-for="s in product.variants.size"
              :key="s"
              :class="{ active: selectedSize === s }"
              @click="selectedSize = s"
            >
              {{ s }}
            </button>
          </div>
        </div>

      </div>

      <button
        class="add-btn"
        :disabled="!canAddToCart || product.stock === 0"
        @click="addToCart"
      >
        {{ product.stock === 0 ? 'Out of stock' : 'Add to basket' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.details {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: var(--bg);
  color: var(--text);
}

.image-box {
  flex: 1;
}

.main-img {
  width: 100%;
  border-radius: 8px;
}

.info {
  flex: 1;
}

.price {
  font-size: 1.8rem;
  margin: 1rem 0;
}

.variants {
  margin: 1.5rem 0;
}

.options {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.options button {
  padding: 0.4rem 0.8rem;
  border: 1px solid #aaa;
  border-radius: 6px;
  background: #f7f7f7;
  cursor: pointer;
}

.options button.active {
  background: #333;
  color: white;
  border-color: #333;
}

.add-btn {
  padding: 0.8rem 1.4rem;
  background: #2b7cff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.not-found {
  padding: 2rem;
  font-size: 1.4rem;
}

.stock-status {
  margin: 0.5rem 0 1rem;
  font-weight: 600;
  font-size: 0.95rem;
}

.stock-status.low {
  color: #d97706;
}

.stock-status.last {
  color: #dc2626;
}

.stock-status.out {
  color: #6b7280;
}


@media (max-width: 768px) {
  .details {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
  }

  .image-box {
    width: 100%;
  }

  .main-img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .info {
    width: 100%;
    margin-top: 1.5rem;
  }

  .options {
    justify-content: center;
    flex-wrap: wrap;
  }

  .add-btn {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
