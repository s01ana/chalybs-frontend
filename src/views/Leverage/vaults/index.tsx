import { useState, useMemo, useCallback} from 'react'
import { useAccount } from 'wagmi'
import {
  Text,
  Flex,
  Loading,
  SearchInput,
  FlexLayout,
  ToggleView,
} from 'components'
import { useMatchBreakpoints } from 'contexts'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { useVaults, usePollVaultsWithUserData } from 'state/vaults/hooks'
import { ViewMode } from 'state/user/actions'
import { useRouter } from 'next/router'
// import BondTable from './components/BondTable/BondTable'
// import BondCard from './components/BondCard/BondCard'
import { filterVaultsByQuery } from './filterVaultsByQuery'
import VaultTable from './components/VaultTable/VaultTable'
import VaultCard from './components/VaultCard/VaultCard'
// import useAdmin from './hooks/useAdmin'
import { Vault } from './types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const Vaults: React.FC<React.PropsWithChildren> = () => {
  const { isMobile } = useMatchBreakpoints()
  const { query: urlQuery } = useRouter()
  const { vaults, userDataLoaded } = useVaults()

  const [_query, setQuery] = useState('')
  const normalizedUrlSearch = useMemo(() => (typeof urlQuery?.search === 'string' ? urlQuery.search : ''), [urlQuery])
  const query = normalizedUrlSearch && !_query ? normalizedUrlSearch : _query

  const { address: account } = useAccount()

  usePollVaultsWithUserData()
  // useAdmin()

  const userDataReady = !account || (!!account && userDataLoaded)

  const vaultsList = useCallback(
    (vaultsToQuery: Vault[]): Vault[] => {
      return filterVaultsByQuery(vaultsToQuery, query)
    },
    [query],
  )

  const activeVaults = vaultsList(vaults)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
      <Page>
        {/* <ControlContainer>
          <ViewControls>
            <Flex>
              <ToggleView idPrefix="clickVault" viewMode={viewMode} onToggle={setViewMode} />
            </Flex>
          </ViewControls>
          <FilterContainer>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <SearchInput initialValue={normalizedUrlSearch} onChange={handleChangeQuery} placeholder="Search Vaults" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer> */}
        {!isMobile && <Flex mb="20px" mx="27px">
          <img src="/images/leverageBanner.png" width="100%" alt='' />
        </Flex>}
        <VaultTable vaults={vaults} userDataReady={userDataLoaded} />
        <FlexLayout>
          {activeVaults.map((vault) =>
            <VaultCard
              key={vault.id}
              vault={vault}
              account={account}
              removed={false}
            />
          )}
        </FlexLayout>
        {/* {account && !userDataLoaded && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )} */}
      </Page>
  )
}

export default Vaults