import { ChainId } from 'config/chains'
import { VaultConfigBaseProps } from './types'

let logged = false

export const supportedChainId = [ChainId.KAI, ChainId.BSC]

export const getVaultConfig = async (chainId: ChainId) => {
    try {
      let chainId_ = chainId;
      if (!supportedChainId.includes(chainId)) chainId_ = ChainId.KAI
      return (await import(`/${chainId_}.ts`)).default.filter(
        (v: VaultConfigBaseProps) => v.id !== null,
      ) as VaultConfigBaseProps[]
    } catch (error) {
      if (!logged) {
        console.error('Cannot get vault config', error, chainId)
        logged = true
      }
      return []
    }
  }

export * from './types'
