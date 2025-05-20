import { CHAIN_IDS } from 'utils/wagmi'
import { useRouter } from 'next/router'
import { Address } from 'viem'
import LockByToken from 'views/Lock/LockByToken'

const LockByTokenPage = () => {
  const router = useRouter()
  const token = router.query.token as Address
  return <LockByToken token={token} />
}

LockByTokenPage.chains = CHAIN_IDS

export default LockByTokenPage