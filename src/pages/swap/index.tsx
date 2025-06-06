import { ChainId } from 'config/chains'
import { CHAIN_IDS } from 'utils/wagmi'
import Swap from 'views/Swap'
import { SwapFeaturesProvider } from 'views/Swap/SwapFeaturesContext'

const SwapPage = () => {
  return (
    <SwapFeaturesProvider>
      <Swap />
    </SwapFeaturesProvider>
  )
}

SwapPage.chains = [ChainId.KAI]

export default SwapPage
