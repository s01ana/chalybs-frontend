import { ChainId } from 'config/chains'
import { CHAIN_IDS } from 'utils/wagmi'
import Liquidity from 'views/Pool'

const LiquidityPage = () => <Liquidity />

LiquidityPage.chains = [ChainId.KAI]

export default LiquidityPage
