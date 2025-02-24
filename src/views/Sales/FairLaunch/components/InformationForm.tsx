import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { safeGetAddress } from 'utils'
import { Text, Box, Button, Input, Checkbox, Flex, Select, OptionProps } from 'components'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import ProgressSteps from 'views/Swap/components/ProgressSteps'
import { FairLaunch, LaunchpadFormView, TokenData } from '../../types'
import { routers } from '../../constants'
import { FormContainer } from '../../components/FormContainer'

export function InformationForm({
  setModalView,
  tokenData,
  deFiData,
  setDefiData
}: {
  setModalView: Dispatch<SetStateAction<LaunchpadFormView>>
  tokenData: TokenData
  deFiData: FairLaunch
  setDefiData: Dispatch<SetStateAction<FairLaunch>>
}) {
  const {chainId} = useActiveChainId()
  const { address: account } = useAccount()

  const [total, setTotal] = useState<string>(deFiData.total)
  const [whitelist, setWhitelist] = useState<boolean>(deFiData.whitelist)
  const [softCap, setSoftCap] = useState<string>(deFiData.softCap)
  const [maximumBuy, setMaximumBuy] = useState<string>(deFiData.maximumBuy)
  const [router, setRouter] = useState<string>(deFiData.router)
  const [liquidity, setLiquidity] = useState<string>(deFiData.liquidity)
  const [startTime, setStartTime] = useState<string>(deFiData.startTime)
  const [endTime, setEndTime] = useState<string>(deFiData.endTime)
  const [lockTime, setLockTime] = useState<string>(deFiData.lockTime)
  // const [isVesting, setIsVesting] = useState<boolean>(deFiData.isVesting)
  const [isMax, setIsMax] = useState<boolean>(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  // const [vestingFirst, setVestingFirst] = useState<string>(deFiData.vestingData?.vestingFirst ?? "0")
  // const [vestingPeriod, setVestingPeriod] = useState<string>(deFiData.vestingData?.vestingPeriod ?? "0")
  // const [vestingEach, setVestingEach] = useState<string>(deFiData.vestingData?.vestingEach ?? "0")

  const [totalError, setTotalError] = useState("");
  const [softCapError, setSoftCapError] = useState("");
  const [maximumBuyError, setMaximumBuyError] = useState("");
  const [routerError, setRouterError] = useState("");
  const [liquidityError, setLiquidityError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [lockTimeError, setLockTimeError] = useState("");
  // const [vestingFirstError, setVestingFirstError] = useState("");
  // const [vestingPeriodError, setVestingPeriodError] = useState("");
  // const [vestingEachError, setVestingEachError] = useState("");

  const handleNext = async () => {
    setDefiData({
      total,
      whitelist,
      softCap,
      isMax,
      maximumBuy,
      router,
      liquidity,
      startTime,
      endTime,
      lockTime,
      totalAmount: totalAmount.toString(),
      // isVesting,
      // vestingData: {
      //   vestingFirst,
      //   vestingPeriod,
      //   vestingEach
      // }
    })
    setModalView(LaunchpadFormView.Socials)
  }

  const handlePrev = async () => {
    setDefiData({
      total,
      whitelist,
      softCap,
      isMax,
      maximumBuy,
      router,
      liquidity,
      startTime,
      endTime,
      lockTime,
      totalAmount: totalAmount.toString(),
      // isVesting,
      // vestingData: {
      //   vestingFirst,
      //   vestingPeriod,
      //   vestingEach
      // }
    })
    setModalView(LaunchpadFormView.VerifyToken)
  }

  useEffect(() => {
    setTotalError("")
    setLiquidityError("")
    setLockTimeError("")
    // setVestingFirstError("")
    // setVestingPeriodError("")
    // setVestingEachError("")
    setRouterError("")

    if (Number(total) <= 0) setTotalError("Total selling amount must be positive number")
    if (total === "") setTotalError("Total selling amount cannot be blank")

    if (Number(liquidity) <= 50) setLiquidityError("Liquidity must be greater than 50%")
    if (liquidity === "") setLiquidityError("Liquidity cannot be blank")

    if (Number(lockTime) < 30) setLockTimeError("Liquidity lock time must be greater than or equal to 30")
    if (lockTime === "") setLockTimeError("Liquidity lock time cannot be blank")

    // if (Number(vestingFirst) < 1) setVestingFirstError("First release for presale must be 1 or more")
    // if (vestingFirst === "") setVestingFirstError("First release for presale cannot be blank")

    // if (Number(vestingPeriod) < 1) setVestingPeriodError("Vesting period each cycle must be 1 or more")
    // if (vestingPeriod === "") setVestingPeriodError("Vesting period each cycle cannot be blank")

    // if (Number(vestingEach) < 1) setVestingEachError("Presale token release each cycle must be 1 or more")
    // if (vestingEach === "") setVestingEachError("Presale token release each cycle cannot be blank")

    if (!safeGetAddress(router)) setRouterError("Invalid router address")
    if (router === "") setRouterError("Router address cannot be blank")
  // }, [total, router, liquidity, lockTime, vestingFirst, vestingPeriod, vestingEach])
  }, [total, router, liquidity, lockTime])

  useEffect(() => {
    setSoftCapError("")
    if (Number(softCap) <= 0) setSoftCapError("Softcap must be positive number")
    if (softCap === "") setSoftCapError("Softcap cannot be blank")
  }, [softCap])

  useEffect(() => {
    setMaximumBuyError("")
    if (Number(maximumBuy) <= 0) setMaximumBuyError("Maximum buy must be positive number")
    if (maximumBuy === "") setMaximumBuyError("Maximum buy cannot be blank")
  }, [maximumBuy])

  useEffect(() => {
    setStartTimeError("")
    setEndTimeError("")
    const startTimeInTimestamp = Date.parse(`${startTime.replace("T", " ")} GMT`);
    const endTimeInTimestamp = Date.parse(`${endTime.replace("T", " ")} GMT`);
    if (Number.isNaN(startTimeInTimestamp)) {setStartTimeError("Start time cannot be blank"); return}
    if (Number.isNaN(endTimeInTimestamp)) {setEndTimeError("End time cannot be blank"); return}
    if (startTimeInTimestamp + 24 * 7 * 3600 * 1000 < endTimeInTimestamp) setStartTimeError("The duration between Start time and End time must be less than 7 days")
    if (startTimeInTimestamp >= endTimeInTimestamp) setStartTimeError("Start time needs to be before End time")
    if (startTimeInTimestamp <= Date.now()) setStartTimeError("Start time needs to be after now")

  }, [startTime, endTime])

  useEffect(() => {
    const _totalAmount1 = Number(total) * 10 ** tokenData.tokenDecimals
    const _feeCurrency = tokenData.mainFee === "50" ? Number(softCap) / 20 : Number(softCap) / 50
    const _totalAmount2 = Number(liquidity) / 100 * (Number(softCap) - _feeCurrency) / Number(softCap) * _totalAmount1
    const _feeToken = tokenData.mainFee === "50" ? 0 : _totalAmount1 / 50

    const _totalAmount = (_totalAmount1 + _totalAmount2 + _feeToken) / 10 ** tokenData.tokenDecimals
    setTotalAmount(_totalAmount)

  }, [softCap, total, liquidity, tokenData])

  const enabled = 
    total !== "" &&
    totalError === "" &&
    softCap !== "" &&
    softCapError === "" &&
    (
      isMax ? (
        maximumBuy !== "" &&
        maximumBuyError === ""
      ) : true
    ) &&
    startTime !== "" &&
    startTimeError === "" &&
    endTime !== "" &&
    endTimeError === "" &&
    router !== "" &&
    routerError === "" &&
    liquidity !== "" &&
    liquidityError === "" && 
    lockTime !== "" &&
    lockTimeError === ""
    // (
    //   isVesting ? (
    //     vestingFirst !== "" &&
    //     vestingFirstError === "" && 
    //     vestingPeriod !== "" &&
    //     vestingPeriodError === "" && 
    //     vestingEach !== "" &&
    //     vestingEachError === ""
    //   ) : true
    // )

  return (
    <Box position="inherit">
      <FormContainer>
        <Box mt="20px">
          <ProgressSteps steps={[true, false, false]} />
        </Box>
        <Box>
          <Text fontSize="18px" color="primary">2. DeFi FairLaunch Info</Text>
          <Text fontSize="14px">Enter the launchpad information that you want to raise , that should be enter all details about your presale</Text>
        </Box>
        <Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Total Selling Amount*</Text>
            <Input
              type="number"
              placeholder='100'
              scale="md"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
            {totalError !== "" && <Text color="failure" fontSize="14px" px="4px">
              {totalError}
            </Text>}
          </Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Whitelist</Text>
            <Flex>
              <Flex alignItems="center" onClick={() => setWhitelist(false)}>
                <Checkbox
                  scale="sm"
                  checked={whitelist === false}
                  readOnly
                />
                <Text ml="10px">Disable</Text>
              </Flex>
              <Flex alignItems="center" ml="25px" onClick={() => setWhitelist(true)}>
                <Checkbox
                  scale="sm"
                  checked={whitelist === true}
                  readOnly
                />
                <Text ml="10px">Enable</Text>
              </Flex>
            </Flex>
            <Text color="text" fontSize="14px">You can enable/disable whitelist anytime.</Text>
          </Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Softcap ({tokenData.currency.symbol})*</Text>
            <Input
              type="number"
              placeholder='Ex: 10'
              scale="md"
              value={softCap}
              onChange={(e) => setSoftCap(e.target.value)}
            />
            {softCapError !== "" && <Text color="failure" fontSize="14px" px="4px">
              {softCapError}
            </Text>}
          </Box>
          <Box mb="20px">
            <Flex alignItems="center" mb="10px" onClick={() => setIsMax(!isMax)}>
              <Checkbox
                scale="sm"
                checked={isMax}
                readOnly
              />
              <Text ml="10px">Setting max contribution?</Text>
            </Flex>
            {isMax && <>
              <Text fontSize="12px" color="primary">Maximum buy ({tokenData.currency.symbol})*</Text>
              <Input
                type="number"
                placeholder={`1${tokenData.currency.symbol}`}
                scale="md"
                value={maximumBuy}
                onChange={(e) => setMaximumBuy(e.target.value)}
              />
              {maximumBuyError !== "" && <Text color="failure" fontSize="14px" px="4px">
                {maximumBuyError}
              </Text>}
            </>}
          </Box>
          <Box mb="20px">
            <Flex flexDirection={["column", "column", "column", "row"]}>
              <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
                <Text fontSize="12px" color="primary">Liquidity (%)*</Text>
                <Input
                  type="number"
                  placeholder='Ex: 52'
                  scale="md"
                  value={liquidity}
                  onChange={(e) => setLiquidity(e.target.value)}
                />
                {liquidityError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {liquidityError}
                </Text>}
              </Box>
              {tokenData.listingOption && <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                <Text fontSize="12px" color="primary">Router*</Text>
                <Select
                  options={routers[chainId].map((r) => { return {
                      label: r.label,
                      value: r.value
                  }})}
                  onOptionChange={(option: OptionProps) => {setRouter(option.value)}}
                />
                {routerError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {routerError}
                </Text>}
              </Box>}
            </Flex>
          </Box>
          <Box mb="20px">
            <Flex flexDirection={["column", "column", "column", "row"]}>
              <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
                <Text fontSize="12px" color="primary">Start time (UTC)</Text>
                <Input
                  type="datetime-local"
                  placeholder="Select date"
                  scale="md"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                {startTimeError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {startTimeError}
                </Text>}
              </Box>
              <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                <Text fontSize="12px" color="primary">End time (UTC)</Text>
                <Input
                  type="datetime-local"
                  placeholder="Select date"
                  scale="md"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                {endTimeError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {endTimeError}
                </Text>}
              </Box>
            </Flex>
          </Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Liquidity lockup (days)*</Text>
            <Input
              type="number"
              placeholder='0'
              scale="md"
              value={lockTime}
              onChange={(e) => setLockTime(e.target.value)}
            />
            {lockTimeError !== "" && <Text color="failure" fontSize="14px" px="4px">
              {lockTimeError}
            </Text>}
          </Box>
          <Flex mb="20px" justifyContent="center">
            <Text fontSize="16px" color="text">Need {totalAmount.toLocaleString()} {tokenData.tokenSymbol} to create launchpad.</Text>
          </Flex>
        </Box>
        {!account ? <ConnectWalletButton /> : <Flex width="100%">
          <Button
            width="100%"
            mr="15px"
            onClick={handlePrev}
            height="48px"
            variant="secondary"
          >Prev</Button>
          <Button
            width="100%"
            onClick={handleNext}
            disabled={!enabled}
            height="48px"
            variant="primary"
          >Next</Button>
        </Flex>}
      </FormContainer>
    </Box>
  )
}