import { useState } from 'react'
import { Currency, Pair, Token, CurrencyAmount } from 'libraries/swap-sdk'
import { Button, ChevronDownIcon, Text, Flex, Box } from 'components'
import NumericalInput from 'components/NumericalInput'
import { useModal } from 'widgets/Modal'
import styled from 'styled-components'
import { safeGetAddress } from 'utils'
import { useAccount } from 'wagmi'
import { useCurrencyBalance } from 'state/wallet/hooks'
import CurrencySearchBridgeModal from 'views/Bridge/components/CurrencySearchBridgeModal'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import { UserMenuItem } from 'widgets/Menu'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { CHAIN_NAME, CHAIN_QUERY_NAME } from 'config/chains'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text' })`
  padding: 0 30px 0 8px;
  margin-right: 16px;
  border: 1px solid ${({theme}) => theme.colors.cardBorder};
  // background-color: ${({theme}) => theme.colors.primary0f};
  height: 36px;
`

const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.input};
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary3D};
  }
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  // background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`
const InputContainer = styled.div<{ error?: boolean }>`
  width: 100%;
  border-radius: 8px;
  // background-color: ${({ theme }) => theme.colors.input};
  // box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
  // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-bottom: 0.5rem;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  maxAmount?: CurrencyAmount<Currency>
  lpPercent?: string
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  showSearchInput?: boolean
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean
  showBUSD?: boolean
  tokensToShow?: Token[]
  sourceChain: number
  targetChain: number
  setTargetChain: (c: number) => void
  isTargetChain?: boolean
}
export default function CurrencyInputBridgePanel({
  label,
  value,
  onUserInput,
  onInputBlur,
  onMax,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  showSearchInput,
  disabled,
  error,
  showBUSD,
  tokensToShow,
  sourceChain,
  targetChain,
  setTargetChain,
  isTargetChain
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const token = pair ? pair.liquidityToken : currency?.isToken ? currency : null
  const tokenAddress = token ? safeGetAddress(token.address) : null

  // const amountInDollar = useBUSDCurrencyAmount(
  //   showBUSD ? currency ?? undefined : undefined,
  //   Number.isFinite(+value) ? +value : undefined,
  // )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchBridgeModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
      showSearchInput={showSearchInput}
      tokensToShow={tokensToShow}
    />,
  )

  const [, setCurrentClickedPercent] = useState('')

  return (
    <>
      <Container position="relative" id={id}>
        <Flex mx="16px" mt="16px" justifyContent="space-between">
          <Text fontSize="14px" color="textDisabled">{label === "From" ? "From:" : "To:"}</Text>
          <Flex alignItems="center">
            <ChainLogo chainId={isTargetChain ? targetChain : sourceChain} width={21} height={21} />
            <Text small color='text' pl="4px">
              {CHAIN_NAME[isTargetChain ? targetChain : sourceChain]}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <InputContainer as="label" error={error}>
            <LabelRow>
              <NumericalInput
                error={error}
                placeholder='0'
                disabled={disabled}
                className="token-amount-input"
                value={value}
                onBlur={onInputBlur}
                onUserInput={(val) => {
                  onUserInput(val)
                  setCurrentClickedPercent('')
                }}
              />
            </LabelRow>
          </InputContainer>
          <Flex>
            <>{beforeButton}</>
            <CurrencySelectButton
              selected={!!currency}
              onClick={() => {
                if (!disableCurrencySelect) {
                  onPresentCurrencyModal()
                }
              }}
            >
              <Flex alignItems="center" justifyContent="space-between">
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                ) : null}
                {pair ? (
                  <Text id="pair" fontSize="10px">
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </Text>
                ) : (
                  <Text id="pair" fontSize="20px">
                    {(currency && currency.symbol && currency.symbol.length > 10
                      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                          currency.symbol.length - 5,
                          currency.symbol.length,
                        )}`
                      : currency?.symbol) || 'Select a currency'}
                  </Text>
                )}
                {!disableCurrencySelect && <ChevronDownIcon />}
              </Flex>
            </CurrencySelectButton>
          </Flex>
        </Flex>
        <InputPanel>
          <Flex alignItems="center" justifyContent="right" p="0 1rem 0.75rem 0.75rem">
            {account && !isTargetChain ? <Text
              onClick={!disabled ? onMax : () => {}}
              color="textSubtle"
              fontSize="14px"
              style={{ display: 'inline', cursor: 'pointer' }}
            >
              {!hideBalance && !!currency
                ? `Balance: ${selectedCurrencyBalance?.toSignificant(6) ?? 'Loading'}`
                : ' -'}
            </Text> : <div />}
          </Flex>
          {disabled && <Overlay />}
        </InputPanel>
      </Container>
    </>
  )
}
