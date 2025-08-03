import { cache } from 'react'

import { sdk } from '@lib/config'
import medusaError from '@lib/util/medusa-error'
import { HttpTypes } from '@medusajs/types'

export const listRegions = cache(async function () {
  // Skip data fetching during build time
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
    return []
  }
  
  return sdk.store.region
    .list({}, { next: { tags: ['regions'] } })
    .then(({ regions }) => regions)
    .catch(medusaError)
})

export const retrieveRegion = cache(async function (id: string) {
  return sdk.store.region
    .retrieve(id, {}, { next: { tags: ['regions'] } })
    .then(({ region }) => region)
    .catch(medusaError)
})

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = cache(async function (countryCode: string) {
  try {
    // Skip data fetching during build time
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
      return null
    }
    
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) {
      return null
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? '', region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get('us')

    return region
  } catch (e: any) {
    return null
  }
})
