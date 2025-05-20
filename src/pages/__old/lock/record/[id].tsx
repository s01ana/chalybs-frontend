import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import LockById from 'views/Lock/LockById'

const LockByIdPage = () => {
	const router = useRouter()
	const id = router.query.id as string
  return <LockById id={id} />
}

LockByIdPage.chains = CHAIN_IDS

export default LockByIdPage
