import { CHAIN_IDS } from 'utils/wagmi'
import Lock from 'views/Lock'

const LockPage = () => {
  return <Lock />
}

LockPage.chains = CHAIN_IDS

export default LockPage
