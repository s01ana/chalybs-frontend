import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { safeGetAddress } from 'utils'
import { Text, Box, Button, Input, Checkbox, Flex, Select, OptionProps } from 'components'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import ProgressSteps from 'views/Swap/components/ProgressSteps'
import { Presale, LaunchpadFormView, TokenData } from '../../types'
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
  deFiData: Presale
  setDefiData: Dispatch<SetStateAction<Presale>>
}) {
  const {chainId} = useActiveChainId()
  const { address: account } = useAccount()

  const [presaleRate, setPresaleRate] = useState<string>(deFiData.presaleRate)
  const [whitelist, setWhitelist] = useState<boolean>(deFiData.whitelist)
  const [softCap, setSoftCap] = useState<string>(deFiData.softCap)
  const [hardCap, setHardCap] = useState<string>(deFiData.hardCap)
  const [minimumBuy, setMinimumBuy] = useState<string>(deFiData.minimumBuy)
  const [maximumBuy, setMaximumBuy] = useState<string>(deFiData.maximumBuy)
  const [refundType, setRefundType] = useState<boolean>(deFiData.refundType)
  const [router, setRouter] = useState<string>(deFiData.router)
  const [liquidity, setLiquidity] = useState<string>(deFiData.liquidity)
  const [listingRate, setListingRate] = useState<string>(deFiData.listingRate)
  const [startTime, setStartTime] = useState<string>(deFiData.startTime)
  const [endTime, setEndTime] = useState<string>(deFiData.endTime)
  const [lockTime, setLockTime] = useState<string>(deFiData.lockTime)
  // const [isVesting, setIsVesting] = useState<boolean>(deFiData.isVesting)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  // const [vestingFirst, setVestingFirst] = useState<string>(deFiData.vestingData?.vestingFirst ?? "0")
  // const [vestingPeriod, setVestingPeriod] = useState<string>(deFiData.vestingData?.vestingPeriod ?? "0")
  // const [vestingEach, setVestingEach] = useState<string>(deFiData.vestingData?.vestingEach ?? "0")

  const [presaleRateError, setPresaleRateError] = useState("");
  const [softCapError, setSoftCapError] = useState("");
  const [hardCapError, setHardCapError] = useState("");
  const [minimumBuyError, setMinimumBuyError] = useState("");
  const [maximumBuyError, setMaximumBuyError] = useState("");
  const [liquidityError, setLiquidityError] = useState("");
  const [listingRateError, setListingRateError] = useState("");
  const [routerError, setRouterError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [lockTimeError, setLockTimeError] = useState("");
  // const [vestingFirstError, setVestingFirstError] = useState("");
  // const [vestingPeriodError, setVestingPeriodError] = useState("");
  // const [vestingEachError, setVestingEachError] = useState("");

  const handleNext = async () => {
    setDefiData({
      presaleRate,
      whitelist,
      softCap,
      hardCap,
      minimumBuy,
      maximumBuy,
      refundType,
      router,
      liquidity,
      listingRate,
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
      presaleRate,
      whitelist,
      softCap,
      hardCap,
      minimumBuy,
      maximumBuy,
      refundType,
      router,
      liquidity,
      listingRate,
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
    setPresaleRateError("")
    setLiquidityError("")
    setListingRateError("")
    setLockTimeError("")
    // setVestingFirstError("")
    // setVestingPeriodError("")
    // setVestingEachError("")
    setRouterError("")

    if (Number(presaleRate) <= 0) setPresaleRateError("Presale rate must be positive number")
    if (presaleRate === "") setPresaleRateError("Presale rate cannot be blank")

    if (Number(liquidity) <= 50) setLiquidityError("Liquidity must be greater than 50%")
    if (liquidity === "") setLiquidityError("Liquidity cannot be blank")

    if (Number(listingRate) <= 0) setListingRateError("Listing rate must be positive number")
    if (listingRate === "") setListingRateError("Listing rate cannot be blank")

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
  // }, [presaleRate, liquidity, listingRate, router, lockTime, vestingFirst, vestingPeriod, vestingEach])
  }, [presaleRate, liquidity, listingRate, router, lockTime])

  useEffect(() => {
    setSoftCapError("")
    setHardCapError("")
    if (4 * Number(softCap) < Number(hardCap) ) setSoftCapError("Softcap must be greater than or equal 25% of Hardcap")
    if (Number(softCap) >= Number(hardCap)) setSoftCapError("Softcap must be less than Hardcap")
    if (Number(softCap) <= 0) setSoftCapError("Softcap must be positive number")
    if (Number(hardCap) <= 0) setHardCapError("Hardcap must be positive number")
    if (softCap === "") setSoftCapError("Softcap cannot be blank")
    if (hardCap === "") setHardCapError("Hardcap cannot be blank")
  }, [softCap, hardCap])

  useEffect(() => {
    setMinimumBuyError("")
    setMaximumBuyError("")
    if (Number(minimumBuy) >= Number(maximumBuy)) setMinimumBuyError("Min buy must be less than max buy")
    if (Number(minimumBuy) <= 0) setMinimumBuyError("Minimum buy must be positive number")
    if (Number(maximumBuy) <= 0) setMaximumBuyError("Maximum buy must be positive number")
    if (minimumBuy === "") setMinimumBuyError("Minimum buy cannot be blank")
    if (maximumBuy === "") setMaximumBuyError("Maximum buy cannot be blank")
  }, [minimumBuy, maximumBuy])

  useEffect(() => {
    setStartTimeError("")
    setEndTimeError("")
    const startTimeInTimestamp = Date.parse(`${startTime.replace("T", " ")} GMT`);
    const endTimeInTimestamp = Date.parse(`${endTime.replace("T", " ")} GMT`);
    if (Number.isNaN(startTimeInTimestamp)) {setStartTimeError("Start time cannot be blank"); return}
    if (Number.isNaN(endTimeInTimestamp)) {setEndTimeError("End time cannot be blank"); return}
    if (startTimeInTimestamp >= endTimeInTimestamp) setStartTimeError("Start time needs to be before End time")
    if (startTimeInTimestamp <= Date.now()) setStartTimeError("Start time needs to be after now")

  }, [startTime, endTime])

  useEffect(() => {
    const _totalAmount1 = Number(hardCap) * Number(presaleRate) * 10 ** tokenData.tokenDecimals
    const _feeCurrency = tokenData.mainFee === "50" ? Number(hardCap) / 20 : Number(hardCap) / 50
    const _totalAmount2 = tokenData.listingOption ? (Number(liquidity) / 100 * (Number(hardCap) - _feeCurrency)) * Number(listingRate) * 10 ** tokenData.tokenDecimals : 0
    const _feeToken = tokenData.mainFee === "50" ? 0 : _totalAmount1 / 50

    const _totalAmount = (_totalAmount1 + _totalAmount2 + _feeToken) / 10 ** tokenData.tokenDecimals
    setTotalAmount(_totalAmount)

  }, [presaleRate, liquidity, listingRate, hardCap, tokenData])

  const enabled = 
    presaleRate !== "" &&
    presaleRateError === "" &&
    softCap !== "" &&
    softCapError === "" &&
    hardCap !== "" &&
    hardCapError === "" &&
    minimumBuy !== "" &&
    minimumBuyError === "" &&
    maximumBuy !== "" &&
    maximumBuyError === "" &&
    startTime !== "" &&
    startTimeError === "" &&
    endTime !== "" &&
    endTimeError === "" &&
    (
      tokenData.listingOption ? (
        router !=="" &&
        routerError === "" &&
        liquidity !== "" &&
        liquidityError === "" && 
        listingRate !== "" &&
        listingRateError === "" && 
        lockTime !== "" &&
        lockTimeError === ""
      ) : true
    )
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
          <Text fontSize="18px" color="primary">2. Presale Info</Text>
          <Text fontSize="14px">Enter the presale information that you want to raise , that should be enter all details about your presale</Text>
        </Box>
        <Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Presale Rate*</Text>
            <Input
              type="number"
              placeholder='100'
              scale="md"
              value={presaleRate}
              onChange={(e) => setPresaleRate(e.target.value)}
            />
            {presaleRateError !== "" && <Text color="failure" fontSize="14px" px="4px">
              {presaleRateError}
            </Text>}
            <Text color="text" fontSize="14px">If I spend 1 {tokenData.currency.symbol} how many tokens will I receive?</Text>
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
            <Flex flexDirection={["column", "column", "column", "row"]}>
              <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
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
              <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                <Text fontSize="12px" color="primary">Hardcap ({tokenData.currency.symbol})*</Text>
                <Input
                  type="number"
                  placeholder='Ex: 10'
                  scale="md"
                  value={hardCap}
                  onChange={(e) => setHardCap(e.target.value)}
                />
                {hardCapError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {hardCapError}
                </Text>}
              </Box>
            </Flex>
            <Text color="text" fontSize="14px">Softcap must be {'>'}= 25% of Hardcap!</Text>
          </Box>
          <Box mb="20px">
            <Flex flexDirection={["column", "column", "column", "row"]}>
              <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
                <Text fontSize="12px" color="primary">Minimum buy ({tokenData.currency.symbol})*</Text>
                <Input
                  type="number"
                  placeholder={`0.1 ${tokenData.currency.symbol}`}
                  scale="md"
                  value={minimumBuy}
                  onChange={(e) => setMinimumBuy(e.target.value)}
                />
                {minimumBuyError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {minimumBuyError}
                </Text>}
              </Box>
              <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                <Text fontSize="12px" color="primary">Maximum buy ({tokenData.currency.symbol})*</Text>
                <Input
                  type="number"
                  placeholder={`0.2 ${tokenData.currency.symbol}`}
                  scale="md"
                  value={maximumBuy}
                  onChange={(e) => setMaximumBuy(e.target.value)}
                />
                {maximumBuyError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {maximumBuyError}
                </Text>}
              </Box>
            </Flex>
          </Box>
          <Box mb="20px">
            <Flex flexDirection={["column", "column", "column", "row"]}>
              <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
                <Text fontSize="12px" color="primary">Refund type</Text>
                <Flex>
                  <Flex alignItems="center" onClick={() => setRefundType(false)}>
                    <Checkbox
                      scale="sm"
                      checked={refundType === false}
                      readOnly
                    />
                    <Text ml="10px">Refund</Text>
                  </Flex>
                  <Flex alignItems="center" ml="25px" onClick={() => setRefundType(true)}>
                    <Checkbox
                      scale="sm"
                      checked={refundType === true}
                      readOnly
                    />
                    <Text ml="10px">Burn</Text>
                  </Flex>
                </Flex>
              </Box>
              {tokenData.listingOption && <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                <Text fontSize="12px" color="primary">Listing on*</Text>
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
          {tokenData.listingOption && <Box mb="20px">
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
              <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                <Text fontSize="12px" color="primary">Listing rate*</Text>
                <Input
                  type="number"
                  placeholder='Ex: 500'
                  scale="md"
                  value={listingRate}
                  onChange={(e) => setListingRate(e.target.value)}
                />
                {listingRateError !== "" && <Text color="failure" fontSize="14px" px="4px">
                  {listingRateError}
                </Text>}
                <Text color="text" fontSize="14px">1 {tokenData.tokenSymbol} = {listingRate} {tokenData.currency.symbol}</Text>
              </Box>
            </Flex>
            <Box mt="10px">
              <Text color="text" fontSize="14px">Enter the percentage of raised funds that should be allocated to Liquidity on Dex (Min 51%, Max 100%)</Text>
              <Text color="text" fontSize="14px">If I spend 1 {tokenData.currency.symbol} on how many tokens will I receive? Usually this amount is lower than presale rate to allow for a higher listing price on Dex</Text>            </Box>
          </Box>}
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
          {tokenData.listingOption && <Box mb="20px">
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
          </Box>}
          {/* <Box mb="20px">
            <Flex alignItems="center" mb="10px" onClick={() => setIsVesting(!isVesting)}>
              <Checkbox
                scale="sm"
                checked={isVesting}
                readOnly
              />
              <Text ml="10px">Using Vesing Contributor?</Text>
            </Flex>
            {isVesting && <Message variant="warning" icon={false} p="8px 12px">
              <MessageText color="text">
                <span>Vesting Contributor does not support rebase tokens.</span>
              </MessageText>
            </Message>}
          </Box> */}
          {/* {isVesting && <>
            <Box mb="20px">
              <Text fontSize="12px" color="primary">First release for presale (%)*</Text>
              <Input
                type="number"
                placeholder="Ex: 40%"
                scale="md"
                value={vestingFirst}
                onChange={(e) => setVestingFirst(e.target.value)}
              />
              {vestingFirstError !== "" && <Text color="failure" fontSize="14px" px="4px">
                {vestingFirstError}
              </Text>}
            </Box>
            <Box mb="20px">
              <Flex flexDirection={["column", "column", "column", "row"]}>
                <Box width="100%" mb={["15px", "15px", "15px", "0"]}>
                  <Text fontSize="12px" color="primary">Vesting period each cycle (days)*</Text>
                  <Input
                    type="number"
                    placeholder='Ex: 365 days'
                    scale="md"
                    value={vestingPeriod}
                    onChange={(e) => setVestingPeriod(e.target.value)}
                  />
                  {vestingPeriodError !== "" && <Text color="failure" fontSize="14px" px="4px">
                    {vestingPeriodError}
                  </Text>}
                </Box>
                <Box ml={["0", "0", "0", "25px"]} mb={["15px", "15px", "15px", "0"]} width="100%">
                  <Text fontSize="12px" color="primary">Presale token release each cycle (%)*</Text>
                  <Input
                    type="number"
                    placeholder='Ex: 20%'
                    scale="md"
                    value={vestingEach}
                    onChange={(e) => setVestingEach(e.target.value)}
                  />
                  {vestingEachError !== "" && <Text color="failure" fontSize="14px" px="4px">
                    {vestingEachError}
                  </Text>}
                </Box>
              </Flex>
            </Box>
          </>} */}
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
            variant='secondary'
          >Prev</Button>
          <Button
            width="100%"
            onClick={handleNext}
            disabled={!enabled}
            height="48px"
            variant='primary'
          >Next</Button>
        </Flex>}
      </FormContainer>
    </Box>
  )
}
