<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart.ts'
import { useHighlight } from '@/composables/useHighlight.ts'
import { useToast } from '@/composables/useToast.ts'
import LoadingCardSkeleton from '@/components/features/LoadingCardSkeleton.vue'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const { highlight } = useHighlight()

const toast = useToast()

const add = (id: string) => {
  cartStore.addToCart(id, 1)
  toast.success('Added to basket!')
}

onMounted(() => {
  if (productsStore.paginatedProducts.length === 0) productsStore.fetchAll()
})
</script>

<template>
  <div class="product-list">
    <div v-if="productsStore.isLoading" class="grid">
      <LoadingCardSkeleton />
    </div>

    <div v-else class="grid fade-in">
      <div v-for="p in productsStore.paginatedProducts" :key="p.id" class="card">

        <div class="inner-container">
          <div v-if="p.stock < 5" class="stock-badge" :class="{
            low: p.stock < 5 && p.stock > 1,
            last: p.stock === 1,
            out: p.stock === 0
          }">
            <span v-if="p.stock === 0">Out of stock</span>
            <span v-else-if="p.stock === 1">Last piece!</span>
            <span v-else-if="p.stock < 5">Low stock</span>
          </div>

          <router-link :to="`/product/${p.id}`">
            <img :src="p.images[0]" class="image" alt=""/>
          </router-link>

          <h3 v-html="highlight(p.title)"></h3>

          <p v-html="highlight(p.description)"></p>

          <h6>{{ p.price.toFixed(2) }} €</h6>
        </div>

        <button @click="add(p.id)" :disabled="p.stock === 0">
          {{ p.stock === 0 ? 'Out of stock' : 'Add to Basket' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
}

.card {
  position: relative;
  background: var(--card-bg);
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  border-radius: 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card:hover {
  transform: translate(0px, -8px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.inner-container {
  padding: 1rem 1rem 0;
}

.image {
  width: 97%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.35s ease;
}

.card:hover .image {
  transform: scale(1.05);
}

.card h3 {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  place-items: center;
  justify-items: center;
  text-align: center;
  margin: inherit;
  padding-top: 10px;
  height: 80px;
  overflow: hidden;
}

.card p {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.4;

  text-align: center;
  color: #b2bec3;
  padding: 0 8px;
  height: 60px;
}

.card h6 {
  font-size: 1.5rem;
  color: var(--selected);
  font-weight: 700;
  text-align: center;
  margin: 0;
}

button {
  text-align: center;
  font-size: 24px;
  background: var(--hover-colored);
  color: #fff;
  width: 100%;
  padding: 15px;
  border: 0;
  outline: none;
  cursor: pointer;
  margin-top: 5px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

button[disabled] {
  background: var(--border);
  cursor: not-allowed;
}

button:hover {
  background: var(--selected);
}

button:active {
  transform: translateY(0);
}

.stock-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(6px);
  background: rgba(0,0,0,0.45);
  z-index: 10;
}

.stock-badge.low {
  background: rgba(245, 158, 11, 0.85); /* amber */
}

.stock-badge.last {
  background: rgba(220, 38, 38, 0.85); /* red */
}

.stock-badge.out {
  background: rgba(107, 114, 128, 0.85); /* gray */
}

.fade-in .card {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.45s ease forwards;
}

.fade-in .card:nth-child(1) { animation-delay: 0.05s; }
.fade-in .card:nth-child(2) { animation-delay: 0.1s; }
.fade-in .card:nth-child(3) { animation-delay: 0.15s; }
.fade-in .card:nth-child(4) { animation-delay: 0.2s; }
.fade-in .card:nth-child(5) { animation-delay: 0.25s; }
.fade-in .card:nth-child(6) { animation-delay: 0.3s; }
.fade-in .card:nth-child(7) { animation-delay: 0.35s; }
.fade-in .card:nth-child(8) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
