<script setup>
import { computed } from 'vue'
import BHeader from './components/BHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showHeader = computed(() => {
  return route.name !== 'CountBookAPI'
})
</script>

<template>
  <div class="container mt-5">
    <header>
      <BHeader v-if="showHeader" />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.list-group-item {
  padding: 10px;
}
</style>
