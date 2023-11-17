<script setup lang="ts">
import PackagesTable from '@/components/packages/PackagesTable.vue'
import AppHeader from '@/components/partials/AppHeader.vue'
import { ref } from 'vue'

const searchQuery = ref('')

function onSearchPress(query: string) {
  searchQuery.value = query
}
</script>

<template>
  <AppHeader @on-search-press="onSearchPress" />
  <div>
    <PackagesTable :search="searchQuery" />
  </div>
</template>
