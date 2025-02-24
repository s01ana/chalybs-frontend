import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useAppKit } from '@reown/appkit/react'
import { safeGetAddress } from 'utils'
import { Currency } from 'libraries/swap-sdk'
import { Text, Box, TextArea, Button, Input, ChevronDownIcon, Flex } from 'components'
import { useModal } from 'widgets/Modal'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { AppHeader } from 'components/App'
import Row from 'components/Layout/Row'
import { CommonBasesType } from 'components/SearchModal/types'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { CryptoFormView, DataType } from '../types'
import ProgressCircles from './ProgressSteps'
import FormContainer from './FormContainer'

const StyledTextArea = styled(TextArea)`
  max-width: 100%;
  min-width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 0 10px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: column;
  // align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export function InputForm({
  setModalView,
  data,
  setData,
  // tag,
  // setTag,
  currency,
  setCurrency,
}: {
  setModalView: Dispatch<SetStateAction<CryptoFormView>>
  data: DataType[]
  setData: Dispatch<SetStateAction<DataType[]>>
  // tag: string
  // setTag: Dispatch<SetStateAction<string>>
  currency: Currency | null
  setCurrency: Dispatch<SetStateAction<Currency | null>>
}) {
  const { open } = useAppKit()
  const { address: account } = useAccount()

  const content = useMemo(() => {
    let result = ""
    data.map((t) => {
      result = `${result}${t.address} ${new BigNumber(t.amount.toString()).toString()}\n`
      return null
    })
    return result.substring(0, result.length - 1)
  }, [data])

  const [allocation, setAllocation] = useState(content);

  const [allocationError, setAllocationError] = useState("Input Allocation");

  const handleAllocation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const alloc = e.target.value;
    setAllocation(alloc);
    parseCSV(alloc);
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const c = event.target?.result as string;
            setAllocation(c);
            parseCSV(c);
        };

        reader.readAsText(file);
    }
  }

  const parseCSV = useCallback((csvContent: string) => {
    const rows = csvContent.split('\n');
    const _senders: string[] = [];
    const _amounts: number[] = [];
    const _dict: any[] = []
    if (csvContent === "") {
      setAllocationError('Recipients allocation is required')
      return;
    }
    for (let i = 0; i < rows.length; i++) {
      const elements = rows[i].replaceAll(",", " ").split(" ").filter(x => x !== "");
      if (elements.length === 0) {
        setAllocationError(`Invalid value at line ${i+1}`);
        return;
      }
      if (!safeGetAddress(elements[0])) {
        setAllocationError(`Invalid address at line ${i+1}`);
        return;
      }
      if (!elements[1]) {
        setAllocationError(`Invalid amount at line ${i+1}`);
        return;
      }
      if (elements.length > 2) {
        setAllocationError(`Invalid value at line ${i+1}`);
        return;
      }
      if (_senders.includes(elements[0])) {
        setAllocationError(`Duplicate address(${elements[0]}) at line ${i+1}`);
        return;
      }
      _senders.push(elements[0]);
      _amounts.push(Number(elements[1]));
      _dict.push({
        address: elements[0],
        amount: Number(elements[1])
      })
    }
    setData(_dict)
    setAllocationError("")
  }, [setData, setAllocationError])

  const handleConfirm = async () => {
    setModalView(CryptoFormView.Quote)
  }

  const placeholder = `Insert allocation: separate with breaks link. By format: address, amount or address amount

Example:
0x0000000000000000000000000000000000001000 13.45
0x0000000000000000000000000000000000002000 1.049
0x0000000000000000000000000000000000003000 1
  `;

  const handleCurrencySelect = useCallback(
    (_currency: Currency) => {
      setCurrency(_currency)
    },
    [setCurrency],
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={currency ?? undefined}
      commonBasesType={CommonBasesType.LIQUIDITY}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  useEffect(() => {
    parseCSV(content)
  }, [parseCSV, content])

  return (
    <Box p="12px" position="inherit">
      <AppHeader 
        title='Multi-Sender' 
        noConfig 
        // extra={{name: "History", link: "/multisend/history"}} 
      />
      <FormContainer>
        <ProgressCircles steps={[false]} />
        <Box>
          <Text fontSize="16px" color="primary">1. Add Allocation</Text>
          <Text fontSize="14px">Enter your token to be send with allocations</Text>
        </Box>
        <Box mt="20px">
          <Text fontSize="14px" color="primary">Currency*</Text>
          <StyledButton
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
            }}
            width="150px"
            height="42px"
          >
            {currency ? (
              <Row>
                <CurrencyLogo currency={currency} />
                <Text ml="8px">{currency.symbol}</Text>
              </Row>
            ) : (
              <Text ml="8px">Select a Token</Text>
            )}
          </StyledButton>
          <Flex justifyContent="space-between">
            <Text fontSize="14px" color="primary">Allocation*</Text>
            {allocationError !== "" && <Text color="failure" fontSize="12px" px="4px">
              {allocationError}
            </Text>}
          </Flex>
          <StyledTextArea
            rows={12}
            placeholder={placeholder}
            value={allocation}
            onChange={handleAllocation}
          />
          {/* {allocationText !== "" && <Text color="failure" fontSize="14px" px="4px">
            {allocationText}
          </Text>} */}
        </Box>
        <Box mt="10px">
          <Input
            type="file"
            id="csvFileInput"
            style={{
              display: "none"
            }}
            value=""
            onInput={handleFileInput}
          />
          <Button
            onClick={() => document.getElementById('csvFileInput')?.click()}
            variant='secondary'
            height="36px"
            padding="0 10px"
            style={{borderRadius: "8px"}}
          >
            <Text fontSize="14px" color="primary">Or choose from CSV file</Text>
          </Button>
        </Box>
        {/* <StyledFlex>
          <Text fontSize="12px" color="primary">Tag</Text>
          <Input
            type="text"
            placeholder="Input tag"
            value={tag}
            style={{borderRadius: "8px"}}
            onChange={(e) => setTag(e.target.value)}
          />
        </StyledFlex> */}
        <Box mt="20px" mb="4px">
          <Text color="warning" fontSize="14px" px="4px">
            Token Multisending is free.
          </Text>
        </Box>
        {!account ? <Button
          width="100%"
          variant='primary'
          height="48px"
          onClick={() => open()}
        >
          <Text fontSize="18px" color="background">
            Connect Wallet
          </Text>
        </Button> : <Button
          onClick={handleConfirm}
          // disabled={allocationError !== "" || allocationText !== ""}
          disabled={allocationError !== ""}
          variant='primary'
          height="48px"
        >Next</Button>}
      </FormContainer>
    </Box>
  )
}
