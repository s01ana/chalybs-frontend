import { Currency, CurrencyAmount } from 'libraries/swap-sdk'
import { Field } from 'state/swap/actions'
import { useCurrencyBalances } from 'state/wallet/hooks'
import tryParseAmount from 'utils/tryParseAmount'
import { useWeb3React } from 'libraries/wagmi'

export function useBridgeInfo(
  typedValue: string,
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  poolAmount: string | undefined,
  min: string | undefined,
  enabled: boolean | undefined
): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
} {
  const { account } = useWeb3React()

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])
  
  const parsedAmount = tryParseAmount(typedValue, inputCurrency ?? undefined)

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  let inputError: string | undefined
  if (!account) {
    inputError = 'Connect Wallet'
  }

  if (!parsedAmount) {
    inputError = inputError ?? 'Enter an amount'
  }

  if (!currencies[Field.INPUT]) {
    inputError = inputError ?? 'Select a token'
  }

  const [balanceIn] = [
    currencyBalances[Field.INPUT],
  ]

  if (balanceIn && balanceIn.lessThan(parsedAmount?? 0)) {
    inputError = `Insufficient ${balanceIn.currency.symbol} balance`
  }

  const outAmount = tryParseAmount(typedValue, outputCurrency ?? undefined)

  if (parsedAmount && poolAmount ? outAmount?.greaterThan(poolAmount.toString()) : false) {
    inputError = 'Insufficient Pool balance'
  }

  if (parsedAmount ? parsedAmount.lessThan(min ?? 0) : false) {
    inputError = 'No enough bridge fee'
  }

  if (!enabled) {
    inputError = 'Disabled token'
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    inputError,
  }
}
