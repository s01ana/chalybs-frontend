import { CHAIN_IDS } from 'utils/wagmi'
import CreateLock from 'views/Lock/CreateLock'

const CreateLockPage = () => {
  return <CreateLock />
}

CreateLockPage.chains = CHAIN_IDS

export default CreateLockPage
