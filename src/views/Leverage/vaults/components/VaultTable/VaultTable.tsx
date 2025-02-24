import { useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Vault } from 'libraries/vaults'

import Row, { RowProps } from './Row'

export interface ITableProps {
  vaults: Vault[]
  userDataReady: boolean
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 8px;
  margin: 16px 0px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const TableWrapper = styled.div`
  overflow: visible;
  scroll-margin-top: 64px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }

    :last-child {
      td[colspan='7'] {
        > div {
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
    }
  }
`
const TableContainer = styled.div`
  position: relative;
`

const VaultTable: React.FC<React.PropsWithChildren<ITableProps>> = ({ vaults, userDataReady }) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { query } = useRouter()

  return (
    <Container id="bonds-table">
      <TableContainer id="table-container">
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {vaults.map((vault) => {
                return (
                  <Row vault={vault} userDataReady={userDataReady} key={`table-vault-${vault.id.toString()}`} />
                )
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )
}

export default VaultTable
