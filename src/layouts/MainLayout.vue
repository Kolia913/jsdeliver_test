<script setup lang="ts">
import AppFooter from '@/components/partials/AppFooter.vue'
</script>
<template>
  <v-app>
    <div :class="$style.layout">
      <router-view></router-view>
    </div>
    <AppFooter />
  </v-app>
</template>

<style lang="scss" module>
.layout {
  min-height: calc(100vh - 96px);
}
</style>
