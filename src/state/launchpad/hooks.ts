import { useQuery } from '@tanstack/react-query'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { SLOW_INTERVAL } from 'config/constants'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { launchpadSelector } from './selectors'
import { fetchLaunchpadPublicDataAsync, fetchLaunchpadUserDataAsync } from '.'
import { SerializedLaunchpadState } from './types'

export const usePollLaunchpadWithUserData = (address: `0x${string}`) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useAccountActiveChain()

  useQuery({
    queryKey: [SLOW_INTERVAL, 'publicLaunchpadData', address, account, chainId],
    queryFn: async () => {
      dispatch(fetchLaunchpadPublicDataAsync({ address, chainId }))
    },
    enabled: Boolean(chainId) && Boolean(address) && Boolean(account),
    refetchInterval: SLOW_INTERVAL,
  })

  useQuery({
    queryKey: [SLOW_INTERVAL, 'launchpadWithUserData', address, account, chainId],
    queryFn: async () => {
      if (account) {
        const params = { account, address, chainId }
        dispatch(fetchLaunchpadUserDataAsync(params))
      }
    },
    enabled: Boolean(chainId) && Boolean(address) && Boolean(account),
    refetchInterval: SLOW_INTERVAL,
  })
}

export const useLaunchpad = (pool: string): SerializedLaunchpadState => {
  const { chainId } = useActiveChainId()
  return useSelector(useMemo(() => launchpadSelector(chainId, pool), [chainId, pool]))
}
