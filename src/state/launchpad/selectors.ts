import { createSelector } from '@reduxjs/toolkit'
import { State } from '../types'

export const launchpadSelector = (chainId: number, address: string) =>
  createSelector(
    (state: State) => state.launchpad,
    (launchpad) => {
      const { data, userDataLoaded, loadingKeys } = launchpad

      return {
        address,
        data,
        chainId,
        userDataLoaded,
        loadingKeys
      }
    },
  )
