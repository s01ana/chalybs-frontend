import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { SLOW_INTERVAL } from 'config/constants'
import { usePriceByPairs } from 'hooks/useBUSDPrice'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useQuery } from '@tanstack/react-query'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { Vault, VaultUserData, VaultState, VaultPublicData, getVaultConfig } from 'libraries/vaults'
import {
  vaultFromNameSelector,
  VaultSelector,
  makeVaultFromIdSelector,
  makeUserVaultFromIdSelector,
} from './selectors'
import { fetchVaultsPublicDataAsync, fetchVaultsUserDataAsync, fetchInitialVaultsData } from '.'
import { State } from '../types'

export const usePollVaultsWithUserData = () => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useActiveWeb3React()

  useQuery({
    queryKey: ['publicVaultData', chainId],
    queryFn: async () => {
      const vaultsConfig = await getVaultConfig(chainId)
      const ids = vaultsConfig.map((vaultToFetch) => vaultToFetch.id)
      dispatch(fetchVaultsPublicDataAsync({ ids, chainId }))
    },
    enabled: Boolean(chainId ),
    refetchInterval: SLOW_INTERVAL,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const name = ['vaultsWithUserData', account, chainId]

  useQuery({
    queryKey: name,
    queryFn: async () => {
      const vaultsConfig = await getVaultConfig(chainId)
      if (!account) {
        throw new Error('Invalid account')
      }
      const ids = vaultsConfig.map((vaultToFetch) => vaultToFetch.id)
      const params = { account, ids, chainId }
      dispatch(fetchVaultsUserDataAsync(params))
    },
    enabled: Boolean(account && chainId),
    refetchInterval: SLOW_INTERVAL,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export const useVaults = (): VaultState => {
  const { chainId } = useActiveChainId()
  return useSelector(useMemo(() => VaultSelector(chainId), [chainId]))
}

export const useVaultFromId = (id: number): Vault | undefined => {
  const vaultFromPid = useMemo(() => makeVaultFromIdSelector(id), [id])
  return useSelector(vaultFromPid)
}

export const useVaultFromName = (name: string): Vault | undefined => {
  const vaultFromName = useMemo(() => vaultFromNameSelector(name), [name])
  return useSelector(vaultFromName)
}

export const useVaultUser = (id): VaultUserData | undefined => {
  const vaultFromIdUser = useMemo(() => makeUserVaultFromIdSelector(id), [id])
  return useSelector(vaultFromIdUser)
}
