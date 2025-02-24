import { ChainId } from 'config/chains'

export const INFO_CLIENT = 'https://api.studio.thegraph.com/query/64292/uniswap/0.0.1'
export const BLOCKS_CLIENT = 'https://gateway.thegraph.com/api/fda00884bf8347a3e82ca42c4ec0fe42/subgraphs/id/64DCU8nq48qdDABnobpDafsg7RF75Rx5soKrHiGA8mqp'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.MAINNET]: INFO_CLIENT,
  [ChainId.TESTNET]: INFO_CLIENT,
}

export const BLOCKS_CLIENT_WITH_CHAIN = {
  [ChainId.MAINNET]: BLOCKS_CLIENT,
  [ChainId.TESTNET]: BLOCKS_CLIENT,
}
