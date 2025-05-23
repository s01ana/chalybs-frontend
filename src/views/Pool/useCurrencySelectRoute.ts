import { Currency } from 'libraries/swap-sdk'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import currencyId from 'utils/currencyId'
import { GTOKEN, USDT } from 'libraries/tokens'

export const useCurrencySelectRoute = () => {
  const native = useNativeCurrency()
  const router = useRouter()
  const { chainId } = useActiveChainId()
  const [currencyIdA, currencyIdB] = router.query.currency || [
    native.symbol,
    GTOKEN[chainId]?.address,
  ]

  const handleCurrencyASelect = useCallback(
    (currencyA_: Currency) => {
      const newCurrencyIdA = currencyId(currencyA_)
      if (newCurrencyIdA === currencyIdB) {
        router.replace(`/add/${currencyIdB}/${currencyIdA}`, undefined, { shallow: true })
      } else if (currencyIdB) {
        router.replace(`/add/${newCurrencyIdA}/${currencyIdB}`, undefined, { shallow: true })
      } else {
        router.replace(`/add/${newCurrencyIdA}`, undefined, { shallow: true })
      }
    },
    [currencyIdB, router, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          router.replace(`/add/${currencyIdB}/${newCurrencyIdB}`, undefined, { shallow: true })
        } else {
          router.replace(`/add/${newCurrencyIdB}`, undefined, { shallow: true })
        }
      } else {
        router.replace(`/add/${currencyIdA || native.symbol}/${newCurrencyIdB}`, undefined, { shallow: true })
      }
    },
    [currencyIdA, router, currencyIdB, native],
  )

  return {
    handleCurrencyASelect,
    handleCurrencyBSelect,
  }
}
