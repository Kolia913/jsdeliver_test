import { type PackageListModel } from '@/interfaces/PackageListModel'
import data from './packagesData.json'

function findPackage(name: string, data: PackageListModel[]): PackageListModel[] {
  return data.filter((item) => item.name.includes(name) || name.includes(item.name))
}

export async function searchPackageByName(name: string): Promise<PackageListModel[]> {
  try {
    const packages: PackageListModel[] = data as PackageListModel[]
    return findPackage(name, packages)
  } catch (_e) {
    throw new Error('Error occured while raeding data from file')
  }
}
