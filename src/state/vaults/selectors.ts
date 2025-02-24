import { createSelector } from '@reduxjs/toolkit'
import { State } from '../types'

const selectVaultByKey = (key: string, value: string | number) => (state: State) =>
  state.vaults.vaults.find((b) => b[key] === value)

export const makeVaultFromIdSelector = (id: number) =>
  createSelector([selectVaultByKey('id', id)], (vault) => vault)

export const vaultFromNameSelector = (name: string) =>
  createSelector([selectVaultByKey('name', name)], (vault) => vault)

export const makeUserVaultFromIdSelector = (id: number) =>
  createSelector([selectVaultByKey('id', id)], (vault) => vault?.userData)

export const VaultSelector = (chainId: number) =>
  createSelector(
    (state: State) => state.vaults,
    (vaults) => {
      const vaults_ = vaults.vaults.filter((vault) => vault.token.chainId === chainId)
      const { userDataLoaded } = vaults

      return {
        vaults: vaults_,
        chainId,
        userDataLoaded,
        loadingKeys: vaults.loadingKeys
      }
    },
  )
