import { useMemo } from 'react'
import { useAllPoolDataSWR } from 'state/info/hooks'

export const usePoolsData = () => {
  // get all the pool datas that exist
  const allPoolData = useAllPoolDataSWR()

  // get all the pool datas that exist
  const poolsData = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => {
        return {
          ...pool.data,
        }
      })
      .filter((pool) => pool.token1.name !== 'unknown' && pool.token0.name !== 'unknown')
  }, [allPoolData])
  return { poolsData }
}
