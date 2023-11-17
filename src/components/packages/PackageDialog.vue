<script lang="ts" setup>
import { usePackagesStore } from '@/stores/packages'
import { watch, ref } from 'vue'
const props = defineProps<{
  title: string
  isOpen: boolean
}>()
const packages = usePackagesStore()
const emit = defineEmits(['onCloseModal'])

watch(
  () => props.isOpen,
  (val) => {
    isDialogShown.value = val
  }
)

const isDialogShown = ref(false)

watch(
  () => isDialogShown.value,
  (val) => {
    if (!val) {
      emit('onCloseModal')
    }
  }
)

function onDialogCloseClick() {
  emit('onCloseModal')
}
</script>
<template>
  <v-dialog width="600" height="500" :class="$style.dialog" v-model="isDialogShown">
    <template #default>
      <v-card :title="props.title">
        <div :class="$style.lists_wrapper">
          <div v-if="packages.packageDetails?.hits.dates">
            <h1 :class="$style.title">Hits dates</h1>
            <v-card-text
              >Rank:
              <span :class="$style.date">{{ packages.packageDetails.hits.rank }}</span></v-card-text
            >
            <v-card-text
              >Type rank:
              <span :class="$style.date">{{
                packages.packageDetails.hits.typeRank
              }}</span></v-card-text
            >
            <v-card-text
              v-for="hitsDate in Object.entries(packages.packageDetails?.hits.dates)"
              :key="hitsDate[0]"
            >
              <span :class="$style.date">{{ hitsDate[0] }}: </span>
              {{ hitsDate[1] }}
            </v-card-text>
          </div>
          <div v-if="packages.packageDetails?.bandwidth.dates">
            <h1 :class="$style.title">Bandwidth dates</h1>
            <v-card-text
              >Rank:
              <span :class="$style.date">{{
                packages.packageDetails.bandwidth.rank
              }}</span></v-card-text
            >
            <v-card-text
              >Type rank:
              <span :class="$style.date">{{
                packages.packageDetails.bandwidth.typeRank
              }}</span></v-card-text
            >
            <v-card-text
              v-for="bandwidthDate in Object.entries(packages.packageDetails?.bandwidth.dates)"
              :key="bandwidthDate[0]"
            >
              <span :class="$style.date">{{ bandwidthDate[0] }}: </span>
              {{ bandwidthDate[1] }}
            </v-card-text>
          </div>
        </div>
        <v-card-text>
          Self api link:
          <a
            target="_blank"
            referrerpolicy="no-referrer"
            :href="packages.packageDetails?.links.self"
            >{{ packages.packageDetails?.links.self }}</a
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="onDialogCloseClick"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<style lang="scss" module>
.lists_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.dialog {
  overflow-y: auto;
}
.date {
  font-weight: bold;
}
.title {
  padding-left: 16px;
  font-weight: bold;
}
</style>
