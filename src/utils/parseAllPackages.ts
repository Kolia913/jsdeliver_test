import axios from 'axios'
import { writeFile as _writeFile, exists as _exists } from 'node:fs'
import { promisify } from 'node:util'

const exists = promisify(_exists)
const writeFile = promisify(_writeFile)

const LIMIT = 100
const BASE_URL = 'https://data.jsdelivr.com/v1/'

async function parseAllPackages(): Promise<unknown[]> {
  let result: unknown[] = []
  for (let i = 1; i <= 100; i++) {
    console.info(`${i} of 100 request processed`)
    const response = await axios.get(`${BASE_URL}stats/packages?page=${i}&limit=${LIMIT}`)
    result = result.concat(...response.data)
  }
  return result
}

async function generateAllPackagesJsonFile(): Promise<void> {
  console.info('Started wrting file')
  try {
    if (!(await exists('packagesData.json'))) {
      const packages = await parseAllPackages()
      const dataString = JSON.stringify(packages)
      writeFile('packagesData.json', dataString)
    }
  } catch (e) {
    console.error(e)
  }
}
generateAllPackagesJsonFile().catch((err) => {
  console.error(err)
})
