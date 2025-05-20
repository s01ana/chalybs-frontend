import { GTOKEN } from 'libraries/tokens'
import { useCurrency } from 'hooks/Tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import RemoveLiquidity from 'views/Pool/RemovePool'
import { ChainId } from 'config/chains'

const RemoveLiquidityPage = () => {
  const router = useRouter()
  const { chainId } = useActiveChainId()

  const native = useNativeCurrency()

  const [currencyIdA, currencyIdB] = router.query.currency || [
    native.symbol,
    GTOKEN[chainId]?.address,
  ]

  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]

  const props = {
    currencyIdA,
    currencyIdB,
    currencyA,
    currencyB,
  }

  return <RemoveLiquidity {...props} />
}

RemoveLiquidityPage.chains = [ChainId.KAI]

export default RemoveLiquidityPage

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currency = (params?.currency as string[]) || []

  if (currency.length === 0) {
    return {
      notFound: true,
    }
  }

  if (currency.length === 1) {
    if (!OLD_PATH_STRUCTURE.test(currency[0])) {
      return {
        redirect: {
          statusCode: 307,
          destination: `/liquidity`,
        },
      }
    }

    const split = currency[0].split('-')
    if (split.length > 1) {
      const [currency0, currency1] = split
      return {
        redirect: {
          statusCode: 307,
          destination: `/remove/${currency0}/${currency1}`,
        },
      }
    }
  }

  return {
    props: {},
  }
}
