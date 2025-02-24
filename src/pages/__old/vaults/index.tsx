import { ChainId } from 'config/chains'
import Vaults from 'views/Leverage/vaults'

const VaultsPage = () => {
  return (
    <Vaults />
  )
}

VaultsPage.chains = [ChainId.MAINNET, ChainId.TESTNET]

export default VaultsPage
