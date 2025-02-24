// import { ChainId } from 'config/chains'
// import { useRouter } from 'next/router'
// import Launchpad from 'views/Sales/Sale'

// const LaunchpadPage = () => {
//   const router = useRouter()

//   const address = router.query.address as `0x${string}`
//   return <Launchpad pool={address} />
// }

// LaunchpadPage.chains = [ChainId.MAINNET, ChainId.TESTNET]

// export default LaunchpadPage

import { NotFound } from 'components/NotFound'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

const NotFoundPage = () => (
  <NotFound LinkComp={Link}>
    <NextSeo title="404" />
  </NotFound>
)

NotFoundPage.chains = []

export default NotFoundPage