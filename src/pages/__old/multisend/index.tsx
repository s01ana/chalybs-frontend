import { CHAIN_IDS } from 'utils/wagmi'
import Multisender from 'views/Multisender'

const MultisenderPage = () => {
  return <Multisender />
}

MultisenderPage.chains = CHAIN_IDS

export default MultisenderPage
