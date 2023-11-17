import type { Links } from './PackageListModel'

export interface PackageDetailsModel {
  hits: Stats
  bandwidth: Stats
  links: Links
}

type Dates = Record<string, number>

interface Stats {
  rank: number
  typeRank: number
  total: number
  dates: Dates
  prev: PrevStats
}

interface PrevStats {
  rank: number
  typeRank: number
  total: number
}
