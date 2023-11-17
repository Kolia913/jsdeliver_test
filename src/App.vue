<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <main>
    <component :is="route.meta.layout || 'div'">
      <router-view />
    </component>
  </main>
</template>
