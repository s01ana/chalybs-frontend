import { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Currency, CurrencyAmount, Token } from 'libraries/swap-sdk'
import { WrappedTokenInfo } from 'libraries/token-lists'
import { Text, QuestionHelper, Box, Flex } from 'components'
import AddToWalletButton from 'components/AddToWallet/AddToWalletButton'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { useAccount } from 'wagmi'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCombinedActiveList } from '../../state/lists/hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useIsUserAddedToken } from '../../hooks/Tokens'
import Column from '../Layout/Column'
import { RowFixed, RowBetween } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import CircleLoader from '../Loader/CircleLoader'
import { isTokenOnList } from '../../utils'
import ImportRow from './ImportRow'

function currencyKey(currency: Currency): string {
  return currency?.isToken ? currency.address : currency?.isNative ? currency.symbol : ''
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`

const LightGreyCard = styled(Box)<{
  width?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  padding: ${({ padding }) => padding ?? '1.25rem'};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ borderRadius }) => borderRadius ?? '16px'};
`

function Balance({ balance }: { balance: CurrencyAmount<Currency> }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean }>`
  padding: 4px 20px 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.colors.background};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  const { address: account } = useAccount()
  const key = currencyKey(currency)
  const selectedTokenList = useCombinedActiveList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)

  // only show add or remove buttons if not on selected list
  return (
    <Flex style={style}>
      <MenuItem
        // style={style}
        className={`token-item-${key}`}
        onClick={() => (isSelected ? null : onSelect())}
        disabled={isSelected}
        selected={otherSelected}
      >
        <CurrencyLogo currency={currency} size="36px" />
        <Column>
          <Text small>{currency.symbol}</Text>
          <Text color="textDisabled" fontSize="12px" ellipsis maxWidth="200px">
            {!isOnSelectedList && customAdded && 'Added by user •'} {currency.name}
          </Text>
        </Column>
        <RowFixed style={{ justifySelf: 'flex-end' }}>
          {balance ? <Balance balance={balance} /> : account ? <CircleLoader /> : null}
        </RowFixed>
      </MenuItem>
      {/* {currency && !currency.isNative ? (
        <Flex alignItems="center" mr="8px">
          <CopyButton
            width="16px"
            buttonColor="textSubtle"
            text={currency.wrapped.address}
            tooltipMessage='Token address copied'
          />
          <AddToWalletButton
            variant="text"
            p="0"
            height="auto"
            width="fit-content"
            tokenAddress={currency.wrapped.address}
            tokenSymbol={currency.symbol}
            tokenDecimals={currency.decimals}
            tokenLogo={currency.wrapped instanceof WrappedTokenInfo ? currency.wrapped.logoURI : undefined}
          />
        </Flex>
      ) : <div />} */}
    </Flex>
  )
}

export default function CurrencyList({
  height,
  currencies,
  inactiveCurrencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef,
  showNative,
  showImportView,
  setImportToken,
  breakIndex,
}: {
  height: number | string
  currencies: Currency[]
  inactiveCurrencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showNative: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
  breakIndex: number | undefined
}) {
  const native = useNativeCurrency()

  const itemData: (Currency | undefined)[] = useMemo(() => {
    let formatted: (Currency | undefined)[] = showNative
      ? [native, ...currencies, ...inactiveCurrencies]
      : [...currencies, ...inactiveCurrencies]
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)]
    }
    return formatted
  }, [breakIndex, currencies, inactiveCurrencies, showNative, native])

  const { chainId } = useActiveChainId()

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index]
      const isSelected = Boolean(selectedCurrency && currency && selectedCurrency.equals(currency))
      const otherSelected = Boolean(otherCurrency && currency && otherCurrency.equals(currency))
      const handleSelect = () => onCurrencySelect(currency)

      const token = wrappedCurrency(currency, chainId)

      const showImport = index > currencies.length

      if (index === breakIndex || !data) {
        return (
          <FixedContentRow style={style}>
            <LightGreyCard padding="8px 12px" borderRadius="8px">
              <RowBetween>
                <Text small>Expanded results from inactive Token Lists</Text>
                <QuestionHelper
                  text="Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists."
                  ml="4px"
                />
              </RowBetween>
            </LightGreyCard>
          </FixedContentRow>
        )
      }

      if (showImport && token) {
        return (
          <ImportRow
            onCurrencySelect={handleSelect}
            style={style}
            token={token}
            showImportView={showImportView}
            setImportToken={setImportToken}
            dim
          />
        )
      }
      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      )
    },
    [
      selectedCurrency,
      otherCurrency,
      chainId,
      currencies.length,
      breakIndex,
      onCurrencySelect,
      showImportView,
      setImportToken,
    ],
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
