import { SerializedWrappedToken } from 'libraries/token-lists'
import { createReducer } from '@reduxjs/toolkit'
import omitBy from 'lodash/omitBy'
import { GAS_PRICE_GWEI } from '../types'
import {
  FarmStakedOnly,
  SerializedPair,
  ViewMode,
  addSerializedPair,
  addSerializedToken,
  addWatchlistPool,
  addWatchlistToken,
  removeSerializedPair,
  removeSerializedToken,
  setSubgraphHealthIndicatorDisplayed,
  updateGasPrice,
  updateUserFarmStakedOnly,
  updateUserFarmsViewMode,
  updateUserPoolStakedOnly,
  updateUserPoolsViewMode,
  setIsExchangeChartDisplayed
} from './actions'

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedWrappedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }
  isExchangeChartDisplayed: boolean
  isSubgraphHealthIndicatorDisplayed: boolean
  userFarmStakedOnly: FarmStakedOnly
  userPoolStakedOnly: boolean
  userPoolsViewMode: ViewMode
  userFarmsViewMode: ViewMode
  userPredictionAcceptedRisk: boolean
  userLimitOrderAcceptedWarning: boolean
  userPredictionChartDisclaimerShow: boolean
  userPredictionChainlinkChartDisclaimerShow: boolean
  userUsernameVisibility: boolean
  gasPrice: string
  watchlistTokens: string[]
  watchlistPools: string[]
  hideTimestampPhishingWarningBanner: number | null
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  tokens: {},
  pairs: {},
  isExchangeChartDisplayed: true,
  isSubgraphHealthIndicatorDisplayed: false,
  userFarmStakedOnly: FarmStakedOnly.ON_FINISHED,
  userPoolStakedOnly: false,
  userPoolsViewMode: ViewMode.TABLE,
  userFarmsViewMode: ViewMode.TABLE,
  userPredictionAcceptedRisk: false,
  userLimitOrderAcceptedWarning: false,
  userPredictionChartDisclaimerShow: true,
  userPredictionChainlinkChartDisclaimerShow: true,
  userUsernameVisibility: false,
  gasPrice: GAS_PRICE_GWEI.rpcDefault,
  watchlistTokens: [],
  watchlistPools: [],
  hideTimestampPhishingWarningBanner: null,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      if (state.tokens[chainId]) {
        state.tokens[chainId] = omitBy(state.tokens[chainId], (value, key) => key === address)
      } else {
        state.tokens[chainId] = {}
      }
    })
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const { chainId } = serializedPair.token0
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
    })
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
      if (state.pairs[chainId]) {
        const tokenAToB = pairKey(tokenAAddress, tokenBAddress)
        const tokenBToA = pairKey(tokenBAddress, tokenAAddress)
        // just delete both keys if either exists
        state.pairs[chainId] = omitBy(state.pairs[chainId], (value, key) => key === tokenAToB || key === tokenBToA)
      }
    })
    .addCase(updateUserFarmStakedOnly, (state, { payload: { userFarmStakedOnly } }) => {
      state.userFarmStakedOnly = userFarmStakedOnly
    })
    .addCase(updateUserPoolStakedOnly, (state, { payload: { userPoolStakedOnly } }) => {
      state.userPoolStakedOnly = userPoolStakedOnly
    })
    .addCase(updateUserPoolsViewMode, (state, { payload: { userPoolsViewMode } }) => {
      state.userPoolsViewMode = userPoolsViewMode
    })
    .addCase(updateUserFarmsViewMode, (state, { payload: { userFarmsViewMode } }) => {
      state.userFarmsViewMode = userFarmsViewMode
    })
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice
    })
    .addCase(addWatchlistToken, (state, { payload: { address } }) => {
      // state.watchlistTokens can be undefined for pre-loaded localstorage user state
      const tokenWatchlist = state.watchlistTokens ?? []
      if (!tokenWatchlist.includes(address)) {
        state.watchlistTokens = [...tokenWatchlist, address]
      } else {
        // Remove token from watchlist
        const newTokens = state.watchlistTokens.filter((x) => x !== address)
        state.watchlistTokens = newTokens
      }
    })
    .addCase(addWatchlistPool, (state, { payload: { address } }) => {
      // state.watchlistPools can be undefined for pre-loaded localstorage user state
      const poolsWatchlist = state.watchlistPools ?? []
      if (!poolsWatchlist.includes(address)) {
        state.watchlistPools = [...poolsWatchlist, address]
      } else {
        // Remove pool from watchlist
        const newPools = state.watchlistPools.filter((x) => x !== address)
        state.watchlistPools = newPools
      }
    })
    .addCase(setIsExchangeChartDisplayed, (state, { payload }) => {
      state.isExchangeChartDisplayed = payload
    })
    .addCase(setSubgraphHealthIndicatorDisplayed, (state, { payload }) => {
      state.isSubgraphHealthIndicatorDisplayed = payload
    }),
)
