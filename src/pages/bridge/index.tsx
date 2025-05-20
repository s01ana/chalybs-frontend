import { CHAIN_IDS } from 'utils/wagmi'
import Bridge from 'views/Bridge'

const BridgePage = () => {
  return (
    <Bridge />
  )
}

BridgePage.chains = CHAIN_IDS

export default BridgePage
