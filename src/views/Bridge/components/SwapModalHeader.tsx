import BigNumber from 'bignumber.js'
import { CurrencyAmount, Currency } from 'libraries/swap-sdk'
import { Chain } from 'viem'
import { Text } from 'components'
import { AutoColumn } from 'components/Layout/Column'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { ChainLogo } from 'components/Logo/ChainLogo'

export default function SwapModalHeader({
  parsedAmount,
  sourceChain,
  targetChain
}: {
  parsedAmount: CurrencyAmount<Currency>
  sourceChain: Chain
  targetChain: Chain
}) {
  return (
    <AutoColumn gap="xs">
      <Text fontSize="14px" color='textDisabled'>From</Text>
      <RowBetween mb="16px">
        <RowFixed gap="0px">
          <Text fontSize="28px" color="primary">
            {parsedAmount.toSignificant(6)} {parsedAmount.currency.symbol}
          </Text>
        </RowFixed>
        <RowFixed gap="4px">
          <ChainLogo chainId={sourceChain.id} width={36} height={36} />
        </RowFixed>
      </RowBetween>
      <Text fontSize="14px" color='textDisabled'>To</Text>
      <RowBetween>
        <RowFixed gap="0px">
          <Text
            fontSize="28px"
            color="primary"
          >
            {new BigNumber(parsedAmount.toSignificant(6)).toJSON()} {parsedAmount.currency.symbol}
          </Text>
        </RowFixed>
        <RowFixed>
          <ChainLogo chainId={targetChain.id} width={36} height={36} />
        </RowFixed>
      </RowBetween>
    </AutoColumn>
  )
}
