import { erc20Abi } from 'viem'
import { treasuryABI } from 'config/abi/treasury'
import chunk from 'lodash/chunk'
import { getTreasuryAddress } from 'utils/addressHelpers'
import { publicClient } from 'utils/wagmi'
import { VaultConfigBaseProps, VaultPublicData } from 'libraries/vaults'

const fetchPublicVaultCalls = (v: VaultConfigBaseProps, chainId: number) => {
  return [
    // Balance of token in the DCP treasury
    {
      abi: treasuryABI,
      address: getTreasuryAddress(chainId),
      functionName: 'pools',
      args: [v.id]
    },
    {
      abi: erc20Abi,
      address: v.token.address,
      functionName: 'balanceOf',
      args: [getTreasuryAddress(chainId)]
    }
  ] as const
}

export const fetchPublicVaultData = async (vaults: VaultConfigBaseProps[], chainId: number): Promise<any[]> => {
  const vaultCalls = vaults.flatMap((v) => fetchPublicVaultCalls(v, chainId))
  const client = publicClient({chainId})
  const chunkSize = vaultCalls.length / vaults.length
  const vaultMultiCallResult = await client.multicall({ contracts: vaultCalls, allowFailure: false })
  return chunk(vaultMultiCallResult, chunkSize)
}
