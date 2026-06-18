<template>
  <div class="app" :class="{ dark: isDark }">
    <Navbar :isDark="isDark" @toggle-theme="toggleTheme">
      <div id="navbar-tools">
        <a id="cart-link" href="#" @click="showCart = !showCart">
          <icon-svg name="shopping-basket" />
          <span v-if="cartStore.totalItems > 0"> {{ cartStore.totalItems }} </span>
        </a>
      </div>
    </Navbar>

    <router-view />

    <CartPopup v-if="showCart" @close="showCart = false" />

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import IconSvg from "@/components/icons/IconSvg.vue";
import { ref, onMounted } from 'vue'
import Navbar from '@/components/features/Navbar.vue'
import CartPopup from '@/components/CartPopup.vue'
import ToastContainer from '@/components/features/ToastContainer.vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products.ts'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const showCart = ref(false)

const isDark = ref(false)

onMounted(() => {
  productsStore.fetchAll()

  // Auto-detect OS theme
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDark.value)
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style>
.app {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

#navbar-tools {
  display: flex;
  flex-direction: row;

  a {
    display: flex;
    place-items: center;
  }

  span {
    background-color: red;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    color: white;
    font-size: 14px;
    display: flex;
    justify-content: center;
    place-items: center;
    position: relative;
    bottom: 8px;
    right: 10px;
  }
}
</style>
