<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['onSearchPress'])
const searchQuery = ref('')

function onSearchClick() {
  emit('onSearchPress', searchQuery.value.trim())
}
</script>
<template>
  <v-app-bar color="#17d4a7" :class="$style.header">
    <v-app-bar-title>JsDeliver Test</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-text-field label="Search" :hide-details="true" v-model="searchQuery"></v-text-field>
    <v-btn @click="onSearchClick" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
