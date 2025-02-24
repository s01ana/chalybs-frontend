import BigNumber from 'bignumber.js'
import { Vault, VaultConfigBaseProps } from 'libraries/vaults'
import { fetchPublicVaultData } from './fetchPublicVaultData'

function vaultTransformer(vaultsCanFetch: VaultConfigBaseProps[]) {
  return (vault, index) => {
    const [
      pool,
      totalLocked
    ] = vault

    return {
      id: vaultsCanFetch[index].id,
      name: vaultsCanFetch[index].name,
      token: vaultsCanFetch[index].token,
      dailyAPR: new BigNumber(pool.dailyAPR._hex).toNumber(),
      totalLocked: new BigNumber(totalLocked.balance._hex).toJSON(),
      totalUsers: new BigNumber(pool.totalUsers._hex).toNumber(),
      totalRewarded: new BigNumber(pool.totalRewarded._hex).toJSON(),
      maxDeposit: new BigNumber(pool.maxDeposit._hex).toJSON()
    }
  }
}

const fetchVaults = async (vaultsCanFetch: VaultConfigBaseProps[], chainId: number): Promise<Vault[]> => {

    const [vaultsResult] = await Promise.all([
        fetchPublicVaultData(vaultsCanFetch, chainId)
    ])
  
    const vaultsPublicData = vaultsResult.map(vaultTransformer(vaultsCanFetch));
    return vaultsPublicData
  }
  
  export default fetchVaults