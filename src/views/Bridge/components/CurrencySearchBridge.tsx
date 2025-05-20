/* eslint-disable no-restricted-syntax */
import { Currency, Token } from 'libraries/swap-sdk'
import { Box, Text } from 'components'
import { useMatchBreakpoints } from 'contexts'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { FixedSizeList } from 'react-window'
import { useAllLists, useInactiveListUrls } from 'state/lists/hooks'
import { WrappedTokenInfo } from 'libraries/token-lists'
import { safeGetAddress } from 'utils'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useAllTokens, useIsUserAddedToken, useToken } from 'hooks/Tokens'
import Column from 'components/Layout/Column'
import CurrencyList from 'components/SearchModal/CurrencyList'
import { createFilterToken, useSortedTokensByQuery } from 'components/SearchModal/filtering'
import useTokenComparator from 'components/SearchModal/sorting'

import ImportRow from 'components/SearchModal/ImportRow'

interface CurrencySearchProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showSearchInput?: boolean
  showCommonBases?: boolean
  commonBasesType?: string
  showImportView: () => void
  setImportToken: (token: Token) => void
  height?: number
  tokensToShow?: Token[]
}

function useSearchInactiveTokenLists(search: string | undefined, minResults = 10): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = useInactiveListUrls()
  const { chainId } = useActiveChainId()
  const activeTokens = useAllTokens()
  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const filterToken = createFilterToken(search)
    const exactMatches: WrappedTokenInfo[] = []
    const rest: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    const trimmedSearchQuery = search.toLowerCase().trim()
    for (const url of inactiveUrls) {
      const list = lists[url]?.current
      // eslint-disable-next-line no-continue
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (
          tokenInfo.chainId === chainId &&
          !(tokenInfo.address in activeTokens) &&
          !addressSet[tokenInfo.address] &&
          filterToken(tokenInfo)
        ) {
          const wrapped: WrappedTokenInfo = new WrappedTokenInfo({
            ...tokenInfo,
            address: safeGetAddress(tokenInfo.address) || tokenInfo.address,
          })
          addressSet[wrapped.address] = true
          if (
            tokenInfo.name?.toLowerCase() === trimmedSearchQuery ||
            tokenInfo.symbol?.toLowerCase() === trimmedSearchQuery
          ) {
            exactMatches.push(wrapped)
          } else {
            rest.push(wrapped)
          }
        }
      }
    }
    return [...exactMatches, ...rest].slice(0, minResults)
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

function CurrencySearchBridge({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  showSearchInput = true,
  showImportView,
  setImportToken,
  height,
  tokensToShow,
}: CurrencySearchProps) {

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const { chainId } = useActiveChainId()

  const aTokens = useAllTokens()
  const allTokens = Object.values(aTokens).filter((token) => ["USDT"].filter((s) => s === token.symbol).length > 0)

  // if they input an address, use it
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const { isMobile } = useMatchBreakpoints()

  const native = useNativeCurrency()

  const showNative: boolean = useMemo(() => {
    if (tokensToShow) return false
    const s = debouncedQuery.toLowerCase().trim()
    return native && native.symbol?.toLowerCase?.()?.indexOf(s) !== -1
  }, [debouncedQuery, native, tokensToShow])

  const filteredTokens: Token[] = useMemo(() => {
    const filterToken = createFilterToken(debouncedQuery)
    return Object.values(tokensToShow || allTokens).filter(filterToken)
  }, [tokensToShow, allTokens, debouncedQuery])

  const filteredQueryTokens = useSortedTokensByQuery(filteredTokens, debouncedQuery)

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredSortedTokens: Token[] = useMemo(() => {
    return [...filteredQueryTokens].sort(tokenComparator)
  }, [filteredQueryTokens, tokenComparator])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
    },
    [onCurrencySelect],
  )

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (!isMobile) inputRef.current?.focus()
  }, [isMobile])

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(debouncedQuery)

  const hasFilteredInactiveTokens = Boolean(filteredInactiveTokens?.length)

  const getCurrencyListRows = useCallback(() => {
    if (searchToken && !searchTokenIsAdded && !hasFilteredInactiveTokens) {
      return (
        <Column style={{ padding: '20px 0', height: '100%' }}>
          <ImportRow
            onCurrencySelect={handleCurrencySelect}
            token={searchToken}
            showImportView={showImportView}
            setImportToken={setImportToken}
          />
        </Column>
      )
    }

    return Boolean(filteredSortedTokens?.length) || hasFilteredInactiveTokens ? (
      <Box mt="24px">
        <CurrencyList
          height={isMobile ? (showCommonBases ? height || 250 : height ? height + 80 : 350) : 390}
          showNative={false}
          currencies={filteredSortedTokens}
          inactiveCurrencies={filteredInactiveTokens}
          breakIndex={
            Boolean(filteredInactiveTokens?.length) && filteredSortedTokens ? filteredSortedTokens.length : undefined
          }
          onCurrencySelect={handleCurrencySelect}
          otherCurrency={otherSelectedCurrency}
          selectedCurrency={selectedCurrency}
          fixedListRef={fixedList}
          showImportView={showImportView}
          setImportToken={setImportToken}
        />
      </Box>
    ) : (
      <Column style={{ padding: '20px', height: '100%' }}>
        <Text color="textSubtle" textAlign="center" mb="20px">
          No results found.
        </Text>
      </Column>
    )
  }, [
    filteredInactiveTokens,
    filteredSortedTokens,
    handleCurrencySelect,
    hasFilteredInactiveTokens,
    otherSelectedCurrency,
    searchToken,
    searchTokenIsAdded,
    selectedCurrency,
    setImportToken,
    showImportView,
    showCommonBases,
    isMobile,
    height,
  ])

  return (
    <>
      {getCurrencyListRows()}
    </>
  )
}

export default CurrencySearchBridge
