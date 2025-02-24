import { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  Flex,
  Skeleton,
  Text,
} from 'components'
import { useMatchBreakpoints } from 'contexts'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { Vault } from 'libraries/vaults'

import CellLayout from 'views/Farms/components/CellLayout'

import VaultInfo from './Vault'
import ActionPanel from './Actions/ActionPanel'
import Details from './Details'
// import Earned from './Earned'

// const { FarmAuctionTag, CoreTag } = FarmUI.Tags

export interface RowProps {
  vault: Vault
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.disabled};
  }
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

type ColumnsDefTypes = {
  id: number;
  label: string;
  name: string;
  sortable: boolean;
};

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: "vault",
    sortable: true,
    label: "",
  },
  {
    id: 2,
    name: "type",
    sortable: false,
    label: "",
  },
  {
    id: 3,
    name: "price",
    sortable: true,
    label: "Price",
  },
  {
    id: 4,
    name: "roi",
    sortable: true,
    label: "ROI",
  },
  {
    id: 5,
    name: "earned",
    sortable: true,
    label: "Pending Payout",
  },
  {
    id: 6,
    name: "purchased",
    sortable: true,
    label: "Purchased",
  },
  {
    id: 7,
    name: "details",
    sortable: true,
    label: "",
  },
];

const Row: React.FunctionComponent<React.PropsWithChildren<RowPropsWithLoading>> = (props) => {
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  const { isMobile } = useMatchBreakpoints()

  const handleRenderRow = () => {
    if (!isMobile) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {DesktopColumnSchema.map((row) => {
            const key = row.name
            switch (key) {
              case 'vault':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <VaultInfo vault={props?.vault} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'earned':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label='Pending Reward'>
                        <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                          {props?.vault?.userData?.pendingReward ? (
                            `${new BigNumber(props?.vault?.userData?.pendingReward).toFixed(2, BigNumber.ROUND_DOWN)} DEF`
                          ) : (
                            <Skeleton height={24} width={80} />
                          )}
                        </Text>
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              // case 'price':
              //   return (
              //     <td key={key}>
              //       <CellInner>
              //         <CellLayout label={t('Bond Price')}>
              //           <Text bold style={{ display: 'flex', alignItems: 'center' }}>
              //             {props?.vault?.bondPriceInUSD ? (
              //               `${props?.vault?.bondPriceInUSD} USD`
              //             ) : (
              //               <Skeleton height={24} width={80} />
              //             )}
              //           </Text>
              //         </CellLayout>
              //       </CellInner>
              //     </td>
              //   )
              case 'roi':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label='dailyAPR'>
                        <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                          {props?.vault?.dailyAPR ? (
                            `${new BigNumber(props?.vault?.dailyAPR).times(100).toFixed(2)} %`
                          ) : (
                            <Skeleton height={24} width={80} />
                          )}
                        </Text>
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'purchased':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label='Purchased'>
                        <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                          {props?.vault?.totalLocked ? (
                            `${props?.vault?.totalLocked}`
                          ) : (
                            <Skeleton height={24} width={80} />
                          )}
                        </Text>
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              default: 
                return <td key={key}><Skeleton height={24} width={80} /></td>
            }
          })}
        </StyledTr>
      )
    }

    return (
      <>
        <tr style={{ cursor: 'pointer' }} onClick={toggleActionPanel}>
          <FarmMobileCell colSpan={3}>
            <Flex justifyContent="space-between" alignItems="center">
              <VaultInfo vault={props?.vault} />
            </Flex>
          </FarmMobileCell>
        </tr>
        <StyledTr onClick={toggleActionPanel}>
          <td width="33%">
            <EarnedMobileCell>
              <CellLayout label='Daily APR'>
                <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                  {props?.vault?.dailyAPR ? (
                    `${props?.vault?.dailyAPR} %`
                  ) : (
                    <Skeleton height={24} width={80} />
                  )}
                </Text>
              </CellLayout>
            </EarnedMobileCell>
          </td>
          <td width="33%">
            <EarnedMobileCell>
              <CellLayout label='Pending Bond'>
                <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                  {props?.vault?.userData?.pendingReward ? (
                    `${new BigNumber(props?.vault?.userData?.pendingReward).toFixed(2, BigNumber.ROUND_DOWN)} DEF`
                  ) : (
                    <Skeleton height={24} width={80} />
                  )}
                </Text>
              </CellLayout>
            </EarnedMobileCell>
          </td>
          <td width="33%">
            <CellInner style={{ justifyContent: 'flex-end' }}>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellInner>
          </td>
        </StyledTr>
      </>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={7}>
            <ActionPanel {...props} expanded={actionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  )
}

export default Row
