<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isDark: Boolean
})
const emit = defineEmits(['toggle-theme'])

const mobileOpen = ref(false)
const icon = computed(() => (props.isDark ? '☀️' : '🌙'))
</script>

<template>
  <nav class="navbar">
    <div id="navbar-logo">
      <router-link to="/" class="logo-link">
        <img src="../../assets/images/logo.png" alt="Grego's DemoShop">
      </router-link>
    </div>

    <div class="links desktop">
      <router-link to="/" class="nav-link">Home</router-link>

      <a class="theme-btn" @click="emit('toggle-theme')">
        {{ icon }}
      </a>

      <slot />
    </div>

    <div class="mobile-controls">
      <a class="theme-btn" @click="emit('toggle-theme')">
        {{ icon }}
      </a>

      <slot />

      <button class="burger" @click="mobileOpen = !mobileOpen">
        ☰
      </button>
    </div>
  </nav>

  <div class="mobile-menu" :class="{ open: mobileOpen }">
    <router-link to="/" @click="mobileOpen = false">Home</router-link>
  </div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

#navbar-logo {
  img {
    height: 50px;
  }
}

.logo-link:hover {
  background: none;
}

:root.dark .navbar {
  background: rgba(20, 20, 20, 0.6);
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
}

.links.desktop {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  font-size: 1.1rem;
  font-weight:700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  padding-right: 2rem;
}

.links.desktop a {
  color: var(--text);
  font-weight: 600;
  transition: color 0.2s ease;
}

.links.desktop a:hover {
  color: var(--selected);
}

.nav-link {
  margin: 0.5rem 1rem;
  padding: 0 0.5rem;
  border-radius: 8px;
}

.theme-btn {
  font-size: 1.3rem;
  cursor: pointer;
}

.mobile-controls {
  display: none;
  align-items: center;
  gap: 0.8rem;
}

.burger {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--text);
}

.mobile-menu {
  position: fixed;
  top: 4rem;
  right: -70%;
  width: 50%;
  height: 100%;
  background: var(--mobile-nav-bg);
  backdrop-filter: blur(18px);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: right 0.3s ease;
  z-index: 999;
}

.mobile-menu.open {
  right: 0;
}

.mobile-menu a {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: var(--text);
  padding-bottom: 0.5rem;
  align-self: center;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .links.desktop {
    display: none;
  }

  .mobile-controls {
    display: flex;
  }
}
@media (max-width: 420px) {
  .navbar {
    padding-left: 0.2rem;
  }

  #navbar-logo {
    img {
      width: 120px;
      height: auto;
    }
  }
}
</style>
