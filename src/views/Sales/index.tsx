import { useState, useMemo, useCallback, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  Text,
  Flex,
  Box,
  OptionProps,
  Button,
  NextLinkFromReactRouter,
} from 'components'
import Page from 'components/Layout/Page'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { SerializedLaunchpadData } from './types'
import { filterPoolsByQuery } from './utils/filterBondsByQuery'
import { useLaunchpads as useLaunchpadList } from './hooks/useLaunchpads'

const PageHeader = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 16px;
`

const NUMBER_OF_FARMS_VISIBLE = 12

const Sales: React.FC<React.PropsWithChildren> = () => {
  const { chainId } = useActiveChainId()
  const { query: urlQuery } = useRouter()

  const startPosition = 0

  const [position, setPosition] = useState(startPosition)

  const data = useLaunchpadList(chainId, BigInt(NUMBER_OF_FARMS_VISIBLE), BigInt(position))

  const [oldData, setOldData] = useState<SerializedLaunchpadData[]>([])

  const [_query, setQuery] = useState('')
  const normalizedUrlSearch = useMemo(() => (typeof urlQuery?.search === 'string' ? urlQuery.search : ''), [urlQuery])
  const query = normalizedUrlSearch && !_query ? normalizedUrlSearch : _query

  const [filterOption, setFilterOption] = useState('')
  const [typeOption, setTypeOption] = useState('')

  const chosenPoolsLength = useRef(0)

  const [activeData, setActiveData] = useState<SerializedLaunchpadData[]>([])

  const poolsList = useCallback(
    (bondsToQuery: SerializedLaunchpadData[]): SerializedLaunchpadData[] => {
      return filterPoolsByQuery(bondsToQuery, query)
    },
    [query],
  )

  const activePools = poolsList(activeData)

  const chosenLaunchpads = useMemo(() => {
    const sortPools = (pools: SerializedLaunchpadData[]): SerializedLaunchpadData[] => {
      switch (filterOption) {
        case 'upcoming':
          return pools.filter((pool) => pool.status === "upcoming")
        case 'live':
          return pools.filter((pool) => pool.status === "live")
        case 'success':
          return pools.filter((pool) => pool.status === "success")
        case 'ended':
          return pools.filter((pool) => pool.status === "ended")
        case 'canceled':
          return pools.filter((pool) => pool.status === "canceled")
        case 'whitelist':
          return pools.filter((pool) => pool.whitelist !== "")
        default:
          return pools
      }
    }

    return sortPools(activePools)
  }, [activePools, filterOption])

  const chosenLaunchpadsByType = useMemo(() => {
    const sortPools = (pools: SerializedLaunchpadData[]): SerializedLaunchpadData[] => {
      switch (typeOption) {
        case 'standard':
          return pools.filter((pool) => pool.presaleType === "standard")
        case 'fair':
          return pools.filter((pool) => pool.presaleType === "fair")
        default:
          return pools
      }
    }

    return sortPools(chosenLaunchpads)
  }, [chosenLaunchpads, typeOption])

  // const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(event.target.value)
  // }

  // const handleFilterOptionChange = (option: OptionProps): void => {
  //   setFilterOption(option.value)
  // }

  // const handleSelectTypeChange = (option: OptionProps): void => {
  //   setTypeOption(option.value)
  // }

  chosenPoolsLength.current = chosenLaunchpadsByType ? chosenLaunchpadsByType.length : 0

  useEffect(() => {
    if (data?.[0]?.address !== oldData?.[0]?.address ){
      const newData = data.filter((lp) => {
        const matchedData = activeData.filter((lp1) => lp1.address === lp.address && lp1.chainId === lp.chainId)
        if (matchedData.length > 0)
          return false
        return true
      })

      setActiveData([...activeData, ...newData])
      setOldData(data)
    }
  }, [data, activeData, oldData])

  // const handleLoad = () => {
  //   setPosition(NUMBER_OF_FARMS_VISIBLE + position)
  // }

  return (
    <Page>
      {/* <ControlContainer>
        <ViewControls>
          <LabelWrapper>
            <Box mt="20px" width="100%">
              <SearchInput initialValue={normalizedUrlSearch} onChange={handleChangeQuery} placeholder="Search Launchpad" />
            </Box>
          </LabelWrapper>
        </ViewControls>
        <FilterContainer>
          <LabelWrapper style={{ marginRight: 16 }}>
            <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
              Filter By
            </Text>
            <Select
              options={[
                {
                  label: 'No Filter',
                  value: '',
                },
                {
                  label: 'Upcoming',
                  value: 'upcoming',
                },
                {
                  label: 'Inprogress',
                  value: 'live',
                },
                {
                  label: 'Success',
                  value: 'success',
                },
                {
                  label: 'Ended',
                  value: 'ended',
                },
                {
                  label: 'Canceled',
                  value: 'canceled',
                },
                {
                  label: 'Whitelist',
                  value: 'whitelist',
                },
              ]}
              onOptionChange={handleFilterOptionChange}
            />
          </LabelWrapper>
          <LabelWrapper>
            <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
              Pool Type
            </Text>
            <Select
              options={[
                {
                  label: 'No Filter',
                  value: '',
                },
                {
                  label: 'Launchpad',
                  value: 'standard',
                },
                {
                  label: 'Fair Launch',
                  value: 'fair',
                },
              ]}
              onOptionChange={handleSelectTypeChange}
            />
          </LabelWrapper>
        </FilterContainer>
      </ControlContainer>
      <FlexLayout>
        {chosenLaunchpadsByType && chosenLaunchpadsByType.length > 0 && chosenLaunchpadsByType.map((launchpad) =>
          <LaunchpadCard
            key={launchpad.address}
            data={launchpad}
          />
        )}
      </FlexLayout>
      <Flex justifyContent="center">
        <CommitButton
          variant='secondary'
          onClick={handleLoad}
          width="200px"
          id="swap-button"
          mx="10px"
        >
          Load more
        </CommitButton>
      </Flex> */}
    </Page>
  )
}

export default Sales