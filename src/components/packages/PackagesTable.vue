<script setup lang="ts">
import { PackageListModel } from '@/interfaces/PackageListModel'
import PackageDialog from '@/components/packages/PackageDialog.vue'
import { usePackagesStore } from '@/stores/packages'
import { reactive, computed, onMounted, watch, ref } from 'vue'

const props = defineProps<{ search: string }>()

const packages = usePackagesStore()
const packagesData = computed<PackageListModel[]>(() => packages.packages)

const headers = [
  { text: 'Type', value: 'type' },
  { text: 'Name', value: 'name' },
  { text: 'Hits', value: 'hits' },
  { text: 'Bandwidth', value: 'bandwidth' },
  { text: 'Previous Period Stats (Hits)', value: 'prev.hits' },
  { text: 'Previous Period Stats (Bandwidth)', value: 'prev.bandwidth' }
]

const selectedPackageTitle = ref<string | null>(null)

const pagination = reactive({
  rowsPerPage: 10,
  totalItems: 1000,
  page: 1
})

watch(
  () => pagination.page,
  (val) => {
    changePage(val)
  }
)

watch(
  () => pagination.rowsPerPage,
  (val) => {
    changeItemsPerPage(val)
  }
)

watch(
  () => props.search,
  (val) => {
    getPackages(val)
  }
)

onMounted(() => {
  getPackages(props.search)
})

function getPackages(searchQuery: string): void {
  packages
    .searchPackageByName({
      name: searchQuery.length > 0 ? searchQuery : '',
      limit: pagination.rowsPerPage,
      page: pagination.page
    })
    .then(() => {
      pagination.totalItems = packages.totalCount
    })
}

function changeItemsPerPage(itemsPerPage: number): void {
  packages.searchPackageByName({ name: props.search, limit: itemsPerPage, page: pagination.page })
}

function changePage(page: number): void {
  packages.searchPackageByName({ name: props.search, limit: pagination.rowsPerPage, page })
}

async function packageClick(item: PackageListModel): Promise<void> {
  await packages.getPackageDetails({ type: item.type, name: item.name })
  selectedPackageTitle.value = item.name
}

function onCloseModal() {
  selectedPackageTitle.value = null
}
</script>
<template>
  <v-data-table
    :fixed-header="true"
    :headers="headers"
    :items="packagesData"
    :hover="true"
    @update:page="changePage"
    :items-per-page="pagination.rowsPerPage"
    class="elevation-1 pt-16"
    :class="$style.table"
  >
    <template v-slot:headers>
      <tr>
        <th>Type</th>
        <th>Name</th>
        <th>Hits</th>
        <th>Bandwidth</th>
        <th>Previous Period Stats (Hits)</th>
        <th>Previous Period Stats (Bandwidth)</th>
      </tr>
    </template>
    <template v-slot:item="{ item }">
      <tr @click="packageClick(item)">
        <td>{{ item.type }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.hits }}</td>
        <td>{{ item.bandwidth }}</td>
        <td>{{ item.prev.hits }}</td>
        <td>{{ item.prev.bandwidth }}</td>
      </tr>
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2" :class="$style.pagination">
        <v-pagination
          v-model="pagination.page"
          :length="packages.totalPages"
          :class="$style.pagination__numbers"
        ></v-pagination>
        <v-select
          :items="[5, 10, 25, 50]"
          v-model="pagination.rowsPerPage"
          :class="$style.pagination__perpage"
        >
        </v-select>
      </div>
    </template>
  </v-data-table>
  <PackageDialog
    :title="selectedPackageTitle ? selectedPackageTitle : ''"
    :is-open="!!selectedPackageTitle"
    @on-close-modal="onCloseModal"
  />
</template>
<style lang="scss" module>
.table {
  min-height: calc(100vh - 96px);
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination__numbers {
  width: 50%;
}

.pagination__perpage {
  max-width: 240px;
  margin-right: 8px;
}
</style>
