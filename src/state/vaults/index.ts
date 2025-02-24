import { Vault, supportedChainId, VaultPublicData, VaultState, VaultUserData, getVaultConfig } from 'libraries/vaults'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import type {
  UnknownAsyncThunkFulfilledAction,
  UnknownAsyncThunkPendingAction,
  UnknownAsyncThunkRejectedAction,
} from '@reduxjs/toolkit/dist/matchers'
import stringify from 'fast-json-stable-stringify'
import keyBy from 'lodash/keyBy'
import type { AppState } from 'state'
import { chains } from 'utils/wagmi'
import { resetUserState } from '../global/actions'
import fetchVaults from './fetchVaults'
import { fetchVaultUserAllowances, fetchVaultUserInfos, fetchVaultUserPendingRewards, fetchVaultUserTokenBalances } from './fetchVaultUser'

const fetchVaultsPublicData = async ({ ids, chainId }): Promise<[Vault[]]> => {
  const vaultsConfig = await getVaultConfig(chainId)
  const vaultsCanFetch = vaultsConfig.filter(
    (vaultConfig) => ids.includes(vaultConfig.id),
  )

  const vaults = await fetchVaults(vaultsCanFetch, chainId)
  
  return [vaults]
}

const initialState: VaultState = {
  vaults: [],
  chainId: undefined,
  userDataLoaded: false,
  loadingKeys: {},
}

// Async thunks
export const fetchInitialVaultsData = createAsyncThunk<
  { vaults: Vault[]; chainId: number },
  { chainId: number },
  {
    state: AppState
  }
>('capital/fetchInitialVaultsData', async ({ chainId }) => {
  const vaultDataList = await getVaultConfig(chainId)
  return {
    vaults: vaultDataList.map((vault) => ({
      ...vault,
      userData: {
        allowance: "0",
        balance: "0",
        amount: "0",
        pendingReward: "0",
        lastLockTime: 0,
        lastRewardTime: 0,
        totalEarned: "0"
      }
    })),
    chainId,
  }
})

export const fetchVaultsPublicDataAsync = createAsyncThunk<
  [Vault[]],
  { ids: number[], chainId: number; },
  {
    state: AppState
  }
>(
  'vaults/fetchVaultsPublicDataAsync',
  async ({ ids, chainId }, { dispatch, getState }) => {
    const state = getState()
    if (state.vaults.chainId !== chainId) {
      await dispatch(fetchInitialVaultsData({ chainId }))
    }
    const chain = chains.find((c) => c.id === chainId)
    if (!chain || !supportedChainId.includes(chainId)) throw new Error('chain not supported')
    try {
      return fetchVaultsPublicData({ ids, chainId })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  {
    condition: (arg, { getState }) => {
      const { vaults } = getState()
      if (vaults.loadingKeys[stringify({ type: fetchVaultsPublicDataAsync.typePrefix, arg })]) {
        console.debug('vaults action is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

async function getVaultsUserValue(vaults, account, chainId) {
  const [userVaultAllowances, userVaultTokenBalances, userVaultInfos, userVaultEarnings] = await Promise.all([
    fetchVaultUserAllowances(account, vaults, chainId),
    fetchVaultUserTokenBalances(account, vaults, chainId),
    fetchVaultUserInfos(account, vaults, chainId),
    fetchVaultUserPendingRewards(account, vaults, chainId),
  ])

  const vaultsUserValue = userVaultAllowances.map((_, index) => {

    return {
      id: vaults[index].id,
      allowance: userVaultAllowances[index],
      balance: userVaultTokenBalances[index],
      amount: userVaultInfos[index].amount,
      pendingReward: userVaultEarnings[index],
      lastLockTime: userVaultInfos[index].lastLockTime,
      lastRewardTime: userVaultInfos[index].lastRewardTime,
      totalEarned: userVaultInfos[index].totalEarned,
    }
  })

  return vaultsUserValue
}

export interface VaultUserResponseData {
  id: number
  allowance: string
  balance: string
  amount: string
  pendingReward: string
  lastLockTime: number
  lastRewardTime: number
  totalEarned: string
}

export const fetchVaultsUserDataAsync = createAsyncThunk<
  [VaultUserResponseData[]],
  { account: `0x${string}` | undefined; ids: number[]; chainId: number },
  {
    state: AppState
  }
>(
  'vaults/fetchVaultsUserDataAsync',
  async ({ account, ids, chainId }, { dispatch, getState }) => {
    const state = getState()
    if (state.vaults.chainId !== chainId) {
      await dispatch(fetchInitialVaultsData({ chainId }))
    }

    const vaultsConfig = await getVaultConfig(chainId)
    const vaultsCanFetch = vaultsConfig.filter(
      (vaultConfig) => ids.includes(vaultConfig.id),
    )

    try {
      return [
        await getVaultsUserValue(vaultsCanFetch, account, chainId),
      ]
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  {
    condition: (arg, { getState }) => {
      const { vaults } = getState()
      if (vaults.loadingKeys[stringify({ type: fetchVaultsUserDataAsync.typePrefix, arg })]) {
        console.debug('vaults user is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

type UnknownAsyncThunkFulfilledOrPendingAction =
  | UnknownAsyncThunkFulfilledAction
  | UnknownAsyncThunkPendingAction
  | UnknownAsyncThunkRejectedAction

const serializeLoadingKey = (
  action: UnknownAsyncThunkFulfilledOrPendingAction,
  suffix: UnknownAsyncThunkFulfilledOrPendingAction['meta']['requestStatus'],
) => {
  const type = action.type.split(`/${suffix}`)[0]
  return stringify({
    arg: action.meta.arg,
    type,
  })
}

export const vaultsSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      state.vaults = state.vaults.map((vault) => {
        return {
          ...vault,
          userData: {
            allowance: '0',
            balance: '0',
            amount: '0',
            pendingReward: '0',
            lastLockTime: 0,
            lastRewardTime: 0,
            totalEarned: '0',
          },
        }
      })
      state.userDataLoaded = false
    })
    // Init capital data
    builder.addCase(fetchInitialVaultsData.fulfilled, (state, action) => {
      const { vaults, chainId } = action.payload
      state.vaults = vaults
      state.chainId = chainId
    })

    // Update capital with live data
    builder.addCase(fetchVaultsPublicDataAsync.fulfilled, (state, action) => {
      const [vaultPayload] = action.payload
      const vaultPayloadIdMap = keyBy(vaultPayload, 'id')

      state.vaults = state.vaults.map((vault) => {
        const liveVaultData = vaultPayloadIdMap[vault.id]
        return { ...vault, ...liveVaultData }
      })
    })

    // Update capital with user data
    builder.addCase(fetchVaultsUserDataAsync.fulfilled, (state, action) => {
      const [vaultPayload] = action.payload
      const userDataMap = keyBy(vaultPayload, 'id')
      state.vaults = state.vaults.map((vault) => {
        const userDataEl = userDataMap[vault.id]
        if (userDataEl) {
          return { ...vault, userData: userDataEl }
        }
        return vault
      })
      state.userDataLoaded = true
    })

    builder.addMatcher(isAnyOf(fetchVaultsPublicDataAsync.pending, fetchVaultsUserDataAsync.pending), (state, action) => {
      state.loadingKeys[serializeLoadingKey(action, 'pending')] = true
    })
    builder.addMatcher(
      isAnyOf(fetchVaultsPublicDataAsync.fulfilled, fetchVaultsUserDataAsync.fulfilled),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'fulfilled')] = false
      },
    )
    builder.addMatcher(
      isAnyOf(fetchVaultsPublicDataAsync.rejected, fetchVaultsUserDataAsync.rejected),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'rejected')] = false
      },
    )
  },
})

export default vaultsSlice.reducer
