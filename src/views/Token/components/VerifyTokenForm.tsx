import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { parseUnits, parseEther, isAddress } from 'viem'
import { Text, Box, Button, Input, Checkbox, Flex } from 'components'
import { useToast } from 'contexts'
import { useAccount } from 'wagmi'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AutoRow } from 'components/Layout/Row'
import { AppHeader } from 'components/App'
import { ToastDescriptionWithTx } from 'components/Toast'
import CircleLoader from 'components/Loader/CircleLoader'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import useCatchTxError from 'hooks/useCatchTxError'
import { TokenFormView, TokenData, FinishData } from '../types'
import { tokenABI, byteCodes } from '../constants'
import useCreateToken from '../hooks/useToken'
import FormContainer from './FormContainer'

export function VerifyTokenForm({
  setModalView,
  tokenData,
  setTokenData,
  setFinishData
}: {
  setModalView: Dispatch<SetStateAction<TokenFormView>>
  tokenData: TokenData
  setTokenData: Dispatch<SetStateAction<TokenData>>
  setFinishData: Dispatch<SetStateAction<FinishData>>
}) {
  const {chainId} = useActiveChainId()
  const native = useNativeCurrency()
  const { address: account } = useAccount()
  const { onDeploy } = useCreateToken()

  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const [name, setName] = useState(tokenData.name)
  const [symbol, setSymbol] = useState(tokenData.symbol)
  const [decimals, setDecimals] = useState(tokenData.decimals)
  const [totalSupply, setTotalSupply] = useState(tokenData.totalSupply)
  const [type, setType] = useState(tokenData.type)

  const [nameError, setNameError] = useState("")
  const [symbolError, setSymbolError] = useState("")
  const [decimalsError, setDecimalsError] = useState("")
  const [totalSupplyError, setTotalSupplyError] = useState("")

  const [taxFee1, setTaxFee1] = useState(tokenData.liquidityGen?.taxFee1 ?? "")
  const [liquidityFee1, setLiquidityFee1] = useState(tokenData.liquidityGen?.liquidityFee1 ?? "")
  const [charityAddr1, setCharityAddr1] = useState(tokenData.liquidityGen?.charityAddr1 ?? "")
  const [charityFee1, setCharityFee1] = useState(tokenData.liquidityGen?.charityFee1 ?? "")

  const [taxFee1Error, setTaxFee1Error] = useState("")
  const [liquidityFee1Error, setLiquidityFee1Error] = useState("")
  const [charityAddr1Error, setCharityAddr1Error] = useState("")
  const [charityFee1Error, setCharityFee1Error] = useState("")

  const [totalFee1Error, setTotalFee1Error] = useState("")

  useEffect(() => {
    setNameError("")
    setSymbolError("")
    setDecimalsError("")
    setTotalSupplyError("")

    if (name.length < 2) setNameError("Name must be at least 2 characters")
    if (name === "") setNameError("Name cannot be blank")

    if (symbol.length < 2) setSymbolError("Symbol must be at least 2 characters")
    if (symbol === "") setSymbolError("Symbol cannot be blank")

    if (Number(decimals) < 2 && type === "standard") setDecimalsError("Decimals must be greater than or equal to 2")
    if (decimals === "" && type === "standard") setDecimalsError("Decimals cannot be blank")

    if (totalSupply === "") setTotalSupplyError("Total Supply cannot be blank")
  }, [name, symbol, decimals, totalSupply, type])

  useEffect(() => {
    setTaxFee1Error("")
    setLiquidityFee1Error("")
    setCharityAddr1Error("")
    setCharityFee1Error("")
    setTotalFee1Error("")

    if (type === "liquidityGen") {
      if (Number(taxFee1) > 25) setTaxFee1Error("taxFeeBps must be less than or equal to 25")
      if (Number(taxFee1) < 0.01) setTaxFee1Error("taxFeeBps must be greater than or equal to 0.01")
      if (taxFee1 === "") setTaxFee1Error("taxFeeBps is a required field")

      if (Number(liquidityFee1) > 25) setLiquidityFee1Error("liquidityFeeBps must be less than or equal to 25")
      if (Number(liquidityFee1) < 0.01) setLiquidityFee1Error("liquidityFeeBps must be greater than or equal to 0.01")
      if (liquidityFee1 === "") setLiquidityFee1Error("liquidityFeeBps is a required field")

      if (!isAddress(charityAddr1)) setCharityAddr1Error("Address is invalid")
      if (charityAddr1 === "") setCharityAddr1Error("Address cannot be blank")

      if (Number(charityFee1) > 25) setCharityFee1Error("charityBps must be less than or equal to 25")
      if (Number(charityFee1) < 0.01) setCharityFee1Error("charityBps must be greater than or equal to 0.01")
      if (charityFee1 === "") setCharityFee1Error("charityBps is a required field")

      if (Number(taxFee1) + Number(liquidityFee1) + Number(charityFee1) > 25) setTotalFee1Error("Total Fee must be less than or equal to 25")
    }
  }, [taxFee1, liquidityFee1, charityAddr1, charityFee1, type])

  const handleConfirm = async () => {
    setTokenData({
      name,
      symbol,
      decimals,
      totalSupply,
      type,
      liquidityGen: {
        taxFee1,
        liquidityFee1,
        charityAddr1,
        charityFee1,
      }
    })

    const args = {
      "standard": [
        name,
        symbol,
        decimals,
        parseUnits(totalSupply, Number(decimals)),
        // feeReceivers[chainId],
        // parseEther(fee[chainId])
      ],
      "liquidityGen": [
        name,
        symbol,
        parseUnits(totalSupply, 18),
        ROUTER_ADDRESS[chainId],
        charityAddr1,
        new BigNumber(taxFee1).times(100).toJSON(),
        new BigNumber(liquidityFee1).times(100).toJSON(),
        new BigNumber(charityFee1).times(100).toJSON(),
        // feeReceivers[chainId],
        // parseEther(fee[chainId]),
      ]
    }

    const receipt = await fetchWithCatchTxError(() => onDeploy(
      tokenABI[type], 
      byteCodes[type], 
      args[type], 
      // parseEther(fee[chainId])
    ))
    if (receipt) {
      toastSuccess(
        'Token Created!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You've just created { name }
        </ToastDescriptionWithTx>,
      )
      setFinishData({
        address: receipt.contractAddress,
        hash: receipt.transactionHash,
        chainId
      })
      setModalView(TokenFormView.Finish)
    }
  }

  const enabled = 
    nameError === "" &&
    symbolError === "" &&
    (
      type === "standard" ? decimalsError === "" : true
    ) &&
    totalSupplyError === "" &&
    (
      type === "liquidityGen" ? (
        taxFee1Error === "" &&
        liquidityFee1Error === "" &&
        charityFee1Error === "" &&
        charityAddr1Error === ""
      ) : true
    )

  return (
    <Box p="12px" position="inherit">
      <AppHeader title="Token Creator" noConfig />
      <FormContainer>
        <Box mt="10px">
          <Flex mb="20px" justifyContent="space-between">
            <Text fontSize="14px" color="primary">Token Type: </Text>
            <Flex
              alignItems="center"
              onClick={
                () => {
                  setType("standard")
                }
              }
            >
              <Checkbox
                scale="sm"
                checked={type === "standard"}
                value="standard"
                readOnly
              />
              <Text ml="20px">Standard Token</Text>
            </Flex>
            {/* <Flex 
              alignItems="center" 
              onClick={
                () => {
                  setType("liquidityGen")
                }
              }
            >
              <Checkbox
                scale="sm"
                checked={type === "liquidityGen"}
                value="liquidityGen"
                readOnly
              />
              <Text ml="20px">Liquidity Generator Token</Text>
            </Flex> */}
          </Flex>
          <Box mb="20px">
            <Flex justifyContent="space-between">
              <Text fontSize="14px" color="primary">Name*</Text>
              {nameError !== "" && <Text color="failure" fontSize="12px" px="4px">
                {nameError}
              </Text>}
            </Flex>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box mb="20px">
            <Flex justifyContent="space-between">
              <Text fontSize="14px" color="primary">Symbol*</Text>
              {symbolError !== "" && <Text color="failure" fontSize="12px" px="4px">
                {symbolError}
              </Text>}
            </Flex>
            <Input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </Box>
          {type === "standard" && <Box mb="20px">
            <Flex justifyContent="space-between">
              <Text fontSize="14px" color="primary">Decimals*</Text>
              {decimalsError !== "" && <Text color="failure" fontSize="12px" px="4px">
                {decimalsError}
              </Text>}
            </Flex>
            <Input
              type="number"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
            />
          </Box>}
          <Box mb="20px">
            <Flex justifyContent="space-between">
              <Text fontSize="14px" color="primary">Total Supply*</Text>
              {totalSupplyError !== "" && <Text color="failure" fontSize="12px" px="4px">
                {totalSupplyError}
              </Text>}
            </Flex>
            <Input
              type="number"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
            />
          </Box>
          {type === "liquidityGen" && <>
            <Box mb="20px">
              <Flex flexDirection={["column", "column", "column", "row"]}>
                <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
                  <Text fontSize="12px" color="primary">Transaction fee to generate yield (%)*</Text>
                  <Input
                    type="number"
                    value={taxFee1}
                    onChange={(e) => setTaxFee1(e.target.value)}
                  />
                  {taxFee1Error !== "" && <Text color="failure" fontSize="14px" px="4px">
                    {taxFee1Error}
                  </Text>}
                </Box>
                <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                  <Text fontSize="12px" color="primary">Transaction fee to generate liquidity (%)*</Text>
                  <Input
                    type="number"
                    value={liquidityFee1}
                    onChange={(e) => setLiquidityFee1(e.target.value)}
                  />
                  {liquidityFee1Error !== "" && <Text color="failure" fontSize="14px" px="4px">
                    {liquidityFee1Error}
                  </Text>}
                </Box>
              </Flex>
            </Box>
            <Box mb="20px">
              <Text fontSize="12px" color="primary">Charity/Marketing address</Text>
              <Input
                type="string"
                value={charityAddr1}
                onChange={(e) => setCharityAddr1(e.target.value)}
              />
              {charityAddr1Error !== "" && <Text color="failure" fontSize="14px" px="4px">
                {charityAddr1Error}
              </Text>}
            </Box>
            <Box mb="20px">
              <Text fontSize="12px" color="primary">Charity/Marketing percent (%)</Text>
              <Input
                type="number"
                value={charityFee1}
                onChange={(e) => setCharityFee1(e.target.value)}
              />
              {charityFee1Error !== "" && <Text color="failure" fontSize="14px" px="4px">
                {charityFee1Error}
              </Text>}
            </Box>
            <Box mb="20px">
              {totalFee1Error !== "" && <Text color="failure" fontSize="14px" px="4px">
                {totalFee1Error}
              </Text>}
            </Box>
          </>}
        </Box>
        <Text color="warning" fontSize="14px" px="4px">
          {/* {`Token creation fee is ${fee[chainId]} ${native.symbol}.`} */}
          Token creation is free.
        </Text>
        {!account ? <ConnectWalletButton /> : (
          <Button
            onClick={handleConfirm}
            disabled={!enabled || pendingTx}
            height="48px"
            variant='primary'
          >
            {
              pendingTx ? 
                <AutoRow gap="6px" justify="center">
                  Creating <CircleLoader stroke="white" />
                </AutoRow> 
              : 
                'Create Token'
              }
          </Button>
        )}
      </FormContainer>
    </Box>
  )
}
