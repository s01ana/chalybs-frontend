// import { CHAIN_IDS } from 'utils/wagmi'
// import Presale from 'views/Sales/Presale'

// const PresalePage = () => {
//   return <Presale />
// }

// PresalePage.chains = CHAIN_IDS

// export default PresalePage


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