import { ChainId } from 'config/chains'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import type {
  UnknownAsyncThunkFulfilledAction,
  UnknownAsyncThunkPendingAction,
  UnknownAsyncThunkRejectedAction,
} from '@reduxjs/toolkit/dist/matchers'
import stringify from 'fast-json-stable-stringify'
import { Address } from 'viem'
import type { AppState } from 'state'
import { chains } from 'utils/wagmi'
import { resetUserState } from '../global/actions'
import fetchLaunchpad from './fetchLaunchpad'
import { SerializedLaunchpad, SerializedLaunchpadState, SerializedLaunchpadUserData, supportedChainId } from './types'
import fetchLaunchpadUserData from './fetchLaunchpadUser'

const initialState: SerializedLaunchpadState = {
  address: "",
  data: {} as SerializedLaunchpad,
  chainId: 0,
  userDataLoaded: false,
  loadingKeys: {},
}

// Async thunks
export const fetchInitialLaunchpadData = createAsyncThunk<
  { launchpad: SerializedLaunchpad, chainId: number },
  { address: string, chainId: number },
  {
    state: AppState
  }
>('launchpad/fetchInitialLaunchpadData', async ({ address, chainId }) => {
  return {
    address,
    launchpad: {
      chainId: ChainId.MAINNET,
      presaleType: "standard",
      token: "",
      buyToken: "",
      presaleStartTimestamp: 0,
      presaleEndTimestamp: 0,
      softCap: 0,
      hardCap: 0,
      minBuy: 0,
      maxBuy: 0,
      total: 0,
      rate: 0,
      listingRate: 0,
      lockPeriod: 0,
      isAutoListing: false,
      vestingFirst: 0,
      vestingPeriod: 0,
      vestingEach: 0,
      mainFee: 0,
      tokenFee: 0,
      liquidity: 0,
      router: "",
      locker: "",
      feeAddress: "",
      tokenBackAddress: "",
      whiteListEnableTime: 0,
      totalDepositedBalance: 0,
      totalClaimedAmount: 0,
      investors: 0,
      refundable: false,
      claimable: false,
      initialized: false,
      info: "",
      logoUrl: "",
      website: "",
      twitter: "",
      facebook: "",
      github: "",
      telegram: "",
      instagram: "",
      discord: "",
      reddit: "",
      youtube: "",
      whitelist: "",
      whitelistLength: 0,
      userData: {
        allowance: 0,
        balance: 0,
        deposit: 0,
        claimed: 0,
        vested: 0,
        owner: false,
        whitelisted: false,
      }
    },
    chainId,
  }
})

export const fetchLaunchpadPublicDataAsync = createAsyncThunk<
  SerializedLaunchpad,
  { address: Address; chainId: number; },
  {
    state: AppState
  }
>(
  'launchpad/fetchLaunchpadPublicDataAsync',
  async ({ address, chainId }, { dispatch, getState }) => {
    const state = getState()
    if (state.launchpad.chainId !== chainId) {
      await dispatch(fetchInitialLaunchpadData({ address, chainId }))
    }
    const chain = chains.find((c) => c.id === chainId)
    if (!chain || !supportedChainId.includes(chainId)) throw new Error('chain not supported')
    if (!address) throw new Error('address not supported')
    try {
      return await fetchLaunchpad(address, chainId)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  {
    condition: (arg, { getState }) => {
      const { launchpad } = getState()
      if (launchpad.loadingKeys?.[stringify({ type: fetchLaunchpadPublicDataAsync.typePrefix, arg })]) {
        console.debug('launchpad action is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

export const fetchLaunchpadUserDataAsync = createAsyncThunk<
  SerializedLaunchpadUserData,
  { account: Address; address: Address; chainId: number },
  {
    state: AppState
  }
>(
  'launchpad/fetchLaunchpadUserDataAsync',
  async ({ account, address, chainId }, { dispatch, getState }) => {
    const state = getState()
    if (state.launchpad.chainId !== chainId) {
      await dispatch(fetchInitialLaunchpadData({ address, chainId }))
    }

    if (!address) throw new Error('address not supported')

    try {
      return fetchLaunchpadUserData(address, account, chainId)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  {
    condition: (arg, { getState }) => {
      const { launchpad } = getState()
      if (launchpad.loadingKeys?.[stringify({ type: fetchLaunchpadUserDataAsync.typePrefix, arg })]) {
        console.debug('launchpad user is fetching, skipping here')
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

export const launchpadSlice = createSlice({
  name: 'Launchpad',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      state.data = {
        ...state.data,
        userData: {
          allowance: 0,
          balance: 0,
          deposit: 0,
          claimed: 0,
          vested: 0,
          owner: false,
          whitelisted: false
        }
      }
      state.userDataLoaded = false
    })
    // Init launchpad data
    builder.addCase(fetchInitialLaunchpadData.fulfilled, (state, action) => {
      const { launchpad, chainId } = action.payload
      state.data = launchpad
      state.chainId = chainId
    })

    // Update launchpad with live data
    builder.addCase(fetchLaunchpadPublicDataAsync.fulfilled, (state, action) => {
      const data= action.payload
      state.data = {...state.data, ...data}
    })

    // Update capital with user data
    builder.addCase(fetchLaunchpadUserDataAsync.fulfilled, (state, action) => {
      const data = action.payload
      state.data = {...state.data, userData: data}
      state.userDataLoaded = true
    })

    builder.addMatcher(isAnyOf(fetchLaunchpadPublicDataAsync.pending, fetchLaunchpadUserDataAsync.pending), (state, action) => {
      state.loadingKeys[serializeLoadingKey(action, 'pending')] = true
    })
    builder.addMatcher(
      isAnyOf(fetchLaunchpadPublicDataAsync.fulfilled, fetchLaunchpadUserDataAsync.fulfilled),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'fulfilled')] = false
      },
    )
    builder.addMatcher(
      isAnyOf(fetchLaunchpadPublicDataAsync.rejected, fetchLaunchpadUserDataAsync.rejected),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'rejected')] = false
      },
    )
  },
})

export default launchpadSlice.reducer
