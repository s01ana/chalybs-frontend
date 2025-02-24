import { CHAIN_IDS } from 'utils/wagmi'
import History from 'views/Multisender/history'

const HistoryPage = () => {
  return <History />
}

HistoryPage.chains = CHAIN_IDS

export default HistoryPage
