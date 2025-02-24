import latinise from 'utils/latinise'
import { Vault } from './types'

export const filterVaultsByQuery = (vaults: Vault[], query: string): Vault[] => {
  if (query) {
    const queryParts = latinise(query.toLowerCase()).trim().split(' ')
    return vaults.filter((vault: Vault) => {
      const farmSymbol = latinise(vault.token.symbol.toLowerCase())
      return queryParts.every((queryPart) => {
        return farmSymbol.includes(queryPart)
      })
    })
  }
  return vaults
}
