import { CurrencyAmount, Currency } from 'libraries/swap-sdk'
import { Chain, formatEther } from 'viem'
import { getBlockExploreLink } from 'utils'
import { Text, LinkExternal } from 'components'
import { CommitButton } from 'components/CommitButton'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'

const accountEllipsis = (address: string) => {
  return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
}

export default function SwapModalFooter({
  parsedAmount,
  onConfirm,
  fee,
  sourceChain,
  recipient
}: {
  parsedAmount: CurrencyAmount<Currency>
  onConfirm: () => void
  fee: bigint
  sourceChain: Chain
  recipient: string
}) {
  return (
    <>
      <AutoColumn>
        <RowBetween align="center">
          <Text fontSize="14px">Bridge Fee :</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatEther(fee)} {sourceChain.nativeCurrency.symbol}
          </Text>
        </RowBetween>
        <RowBetween align="center">
          <Text fontSize="14px">Recipient :</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            <LinkExternal href={getBlockExploreLink(recipient, 'address', sourceChain.id)}>
              <Text color="text">{accountEllipsis(recipient)}</Text>
            </LinkExternal>
          </Text>
        </RowBetween>
      </AutoColumn>

      <AutoRow>
        <CommitButton
          variant="primary"
          onClick={onConfirm}
          // disabled={disabledConfirm}
          mt="12px"
          id="confirm-swap-or-send"
          width="100%"
          height="48px"
        >
          Confirm Bridge
        </CommitButton>
      </AutoRow>
    </>
  )
}
