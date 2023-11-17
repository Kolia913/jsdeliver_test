<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
  {
    link: 'https://github.com/Kolia913',
    icon: 'mdi-github'
  },
  {
    link: 'https://www.linkedin.com/in/mykola-balii-507846282/',
    icon: 'mdi-linkedin'
  }
])
</script>
<template>
  <v-footer :class="$style.footer">
    <div :class="$style.footer__top">
      <strong>Get connected with me on social networks!</strong>

      <v-spacer></v-spacer>

      <a v-for="item in links" :key="item.link" :href="item.link">
        <v-btn class="mx-4" :icon="item.icon" variant="plain" size="small"></v-btn>
      </a>
    </div>

    <div :class="$style.footer__bottom">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>
<style lang="scss" module>
.footer {
  display: flex;
  flex-direction: column;
  padding: 0 !important;
}
.footer__top {
  background-color: #17d4a7;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #fff;
}
.footer__bottom {
  padding: 8px 16px;
  width: 100%;
  text-align: center;
  background-color: #323334;
  color: #fff;
}
</style>
