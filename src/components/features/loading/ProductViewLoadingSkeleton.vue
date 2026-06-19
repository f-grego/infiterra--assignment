<template>
  <div class="details">
    <div class="image-box">
      <div class="img-skeleton skeleton shimmer"></div>
    </div>

    <div class="info">
      <div class="title-skeleton skeleton shimmer"></div>

      <div class="desc-skeleton skeleton shimmer"></div>
      <div class="desc-skeleton short skeleton shimmer"></div>

      <div class="price-skeleton skeleton shimmer"></div>

      <div class="variant-skeleton skeleton shimmer"></div>
      <div class="variant-skeleton skeleton shimmer"></div>

      <div class="btn-skeleton skeleton shimmer"></div>
    </div>
  </div>
</template>

<style scoped>
.details {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-height: 80vh;
}

.image-box {
  flex: 1;
}

.img-skeleton {
  width: 100%;
  height: 350px;
  border-radius: 10px;
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(0,0,0,0.04) 0%,
    rgba(0,0,0,0.08) 50%,
    rgba(0,0,0,0.04) 100%
  );
}

:root.dark .skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 0%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.05) 100%
  );
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title-skeleton {
  width: 70%;
  height: 28px;
  border-radius: 6px;
}

.desc-skeleton {
  width: 100%;
  height: 16px;
  border-radius: 6px;
}

.desc-skeleton.short {
  width: 60%;
}

.price-skeleton {
  width: 40%;
  height: 24px;
  border-radius: 6px;
}

.variant-skeleton {
  width: 50%;
  height: 20px;
  border-radius: 6px;
}

.btn-skeleton {
  width: 100%;
  height: 48px;
  border-radius: 8px;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 150px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.2),
    transparent
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(300%);
  }
}

@media (max-width: 768px) {
  .details {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1rem;
  }

  .image-box {
    flex: none;
    width: 100%;
  }

  .img-skeleton {
    height: 240px;
  }

  .info {
    width: 100%;
  }
}
</style>
