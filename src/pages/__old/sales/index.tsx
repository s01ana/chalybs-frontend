import { CHAIN_IDS } from 'utils/wagmi'
import Sales from 'views/Sales'

const SalesPage = () => {
  return <Sales />
}

SalesPage.chains = CHAIN_IDS

export default SalesPage
