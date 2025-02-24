import { useEffect, useState } from 'react'
import { Block } from 'state/info/types'
import { useQuery } from '@tanstack/react-query'
import { getBlocksFromTimestamps } from 'utils/getBlocksFromTimestamps'

/**
 * for a given array of timestamps, returns block entities
 * @param timestamps
 * @param sortDirection
 * @param skipCount
 */
export const useBlocksFromTimestamps = (
  timestamps: number[],
  sortDirection: 'asc' | 'desc' = 'desc',
  skipCount = 1000,
): {
  blocks?: Block[]
  error: boolean
} => {
  const [blocks, setBlocks] = useState<Block[]>()
  const [error, setError] = useState(false)

  const timestampsString = JSON.stringify(timestamps)
  const blocksString = blocks ? JSON.stringify(blocks) : undefined

  useEffect(() => {
    const fetchData = async () => {
      const timestampsArray = JSON.parse(timestampsString)
      const result = await getBlocksFromTimestamps(timestampsArray, sortDirection, skipCount, "ARB")
      if (result.length === 0) {
        setError(true)
      } else {
        setBlocks(result)
      }
    }
    const blocksArray = blocksString ? JSON.parse(blocksString) : undefined
    if (!blocksArray && !error) {
      fetchData()
    }
  }, [blocksString, error, skipCount, sortDirection, timestampsString])

  return {
    blocks,
    error,
  }
}

export const useBlockFromTimeStampSWR = (
  timestamps: number[],
  sortDirection: 'asc' | 'desc' | undefined = 'desc',
  skipCount: number | undefined = 1000,
) => {
  const timestampsString = JSON.stringify(timestamps)
  const timestampsArray = JSON.parse(timestampsString)
  const { data } = useQuery({
    queryKey: [`info/blocks/${timestampsString}`, "ARB"], 
    queryFn: () => getBlocksFromTimestamps(timestampsArray, sortDirection, skipCount, "ARB"),
  })
  return { blocks: data }
}
