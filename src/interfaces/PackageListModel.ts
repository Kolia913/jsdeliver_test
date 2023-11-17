export interface PackageListModel {
  type: PackageType
  name: string
  hits: number
  bandwidth: number
  prev: PreviousPeriodStats
  links: Links
}

export type PackageType = 'gh' | 'npm'

interface PreviousPeriodStats {
  hits: number
  bandwidth: number
}

export interface Links {
  self: string
  versions: string
}
