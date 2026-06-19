<template>
  <div class="empty-wrapper">
    <div class="empty-card">
      <div class="icon">🛒</div>
      <h2>No products found</h2>
      <p>We couldn’t load any products at the moment.</p>

      <button @click="$emit('retry')">Try again</button>
    </div>
  </div>
</template>

<style scoped>
.empty-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
}

.empty-card {
  background: var(--card-bg);
  padding: 2rem 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0,0,0,0.15);
  max-width: 420px;
  width: 100%;
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

p {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  color: var(--text);
}

button {
  background: var(--hover-colored);
  color: white;
  padding: 0.8rem 1.4rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

button:hover {
  background: var(--selected);
}
</style>
