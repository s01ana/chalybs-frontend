import { ChainId } from 'config/chains'
import { CHAIN_IDS } from 'utils/wagmi'
import PoolFinder from 'views/Pool/PoolFinder'

const PoolFinderPage = () => <PoolFinder />

PoolFinderPage.chains = [ChainId.KAI]

export default PoolFinderPage
