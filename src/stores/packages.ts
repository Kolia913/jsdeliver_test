import type { PackageDetailsModel } from '@/interfaces/PackageDetailsModel'
import type { PackageListModel, PackageType } from '@/interfaces/PackageListModel'
import { searchPackageByName } from '@/utils/packageSearcher'
import axios, { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_BASE_API

interface PackagesState {
  packages: PackageListModel[]
  packageDetails: PackageDetailsModel | null
  totalCount: number
  totalPages: number
}

type GetPackagesPayload = {
  limit: number
  page: number
}

type PackageDetailsPayload = {
  type: PackageType
  name: string
}

type PackageSearchQueryPayload = {
  name: string
  limit: number
  page: number
}

export const usePackagesStore = defineStore('packages', {
  state: (): PackagesState => ({
    packages: [],
    packageDetails: null,
    totalCount: 0,
    totalPages: 0
  }),
  actions: {
    async getPackagesList({ limit = 10, page = 1 }: GetPackagesPayload): Promise<void> {
      const response: AxiosResponse<PackageListModel[]> = await axios.get<PackageListModel[]>(
        `${BASE_URL}stats/packages?page=${page}&limit=${limit}`
      )
      this.packages = response.data
      this.totalCount = parseInt(response.headers['X-Total-Count'.toLowerCase()] || 0)
      this.totalPages = parseInt(response.headers['X-Total-Pages'.toLowerCase()] || 0)
    },
    async getPackageDetails({ type, name }: PackageDetailsPayload): Promise<void> {
      const response: AxiosResponse<PackageDetailsModel> = await axios.get<PackageDetailsModel>(
        `${BASE_URL}stats/packages/${type}/${name}?period=week`
      )
      this.packageDetails = response.data
    },
    async searchPackageByName({ name, page, limit }: PackageSearchQueryPayload): Promise<void> {
      if (name.length <= 0) {
        await this.getPackagesList({ limit, page })
        return
      }
      const result = await searchPackageByName(name)
      this.packages = result.slice((page - 1) * limit, page * limit)
      this.totalCount = result.length
      this.totalPages = Math.floor(result.length / limit)
    }
  }
})
