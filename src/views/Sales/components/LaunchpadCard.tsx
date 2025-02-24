import styled from 'styled-components'
import { zeroAddress } from 'viem'
import { CHAIN_QUERY_NAME } from 'config/chains'
import { Text, Box, Button, Flex, Link, NextLinkFromReactRouter, TokenLogo } from 'components'
import getTimePeriods from 'utils/getTimePeriods'
import Divider from 'components/Divider'
import { ChainLogo } from 'components/Logo/ChainLogo'
import useNativeCurrency from 'hooks/useNativeCurrency'
import useDebounce from 'hooks/useDebounce'
import { useToken } from 'hooks/Tokens'
import useCountdown from 'hooks/useCountdown'
import { SerializedLaunchpadData } from '../types'

const StyledCard = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  width: 100%;
  z-index: 1;
  padding: 1px;
  min-width: 360px;
  // max-width: 450px;
`

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

const StyledChainLogo = styled(Box)`
  position: absolute;
  background-color: ${({theme}) => theme.colors.invertedContrast}
  padding: 8px;
  border-radius: 8px;
  top: 36px;
  right: -8px;
`

const ProgressBase = styled(Box)<{cap: bigint, pos: bigint}>`
  margin-top: 2px;
  border-radius: 8px;
  height: 16px;
  background: ${({ theme, cap, pos }) => cap >= pos ? theme.colors.backgroundAlt : theme.colors.primary};
`

const ProgressBar = styled(Box)<{cap: bigint, pos: bigint}>`
  margin-top: 2px;
  border-radius: 8px;
  width: ${({ cap, pos }) => cap >= pos ? (pos / cap * BigInt(100)).toString() : (cap / pos * BigInt(100)).toString()}%;
  border: 8px solid ${({ theme }) => theme.colors.primary};
`

const Badge = styled(Box)<{ status: string}>`
  background: ${({theme, status}) => status === "upcoming" ? theme.colors.primary3D : status === "live" || status === "success" ? theme.colors.success19 : theme.colors.text};
  color: ${({theme, status}) => status === "upcoming" ? theme.colors.primary : status === "live" || status === "success" ? theme.colors.success : theme.colors.text};
  font-size: 14px;
  border-radius: 8px;
  padding: 3px 15px;
  height: 20px;
`

const padTime = (num: number) => num.toString().padStart(2, '0')

const formatRoundTime = (secondsBetweenBlocks: number) => {
  const { days, hours, minutes, seconds } = getTimePeriods(secondsBetweenBlocks)
  const minutesSeconds = `${padTime(days)}:${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`

  return minutesSeconds
}

const getStatus = (startTime: bigint, endTime: bigint, refundable: boolean, claimable: boolean) => {
  const now = Date.now() / 1000
  if (refundable)
    return ["canceled", "CANCELED", "Presale", "Canceled"]
  if (claimable)
    return ["success", "SUCCESS", "Presale", "Ended"]
  if (startTime > now)
    return ["upcoming", "UPCOMING", "Sale Starts In:", ""]
  if (startTime < now && endTime > now)
    return ["live", "SALE LIVE", "Sale Ends In:", ""]
  if (endTime < now)
    return ["ended", "ENDED", "Presale", "Ended"]
  return ["", "", "", ""]
}

export function LaunchpadCard({
  data
}: {
  data: SerializedLaunchpadData
}) {
  const native = useNativeCurrency()
  const debouncedQuery = useDebounce(data.buyToken, 200)
  const _searchBuyToken = useToken(debouncedQuery)
  const searchBuyToken = data.buyToken === zeroAddress ? native : _searchBuyToken

  const [status, statusText, banText, countText] = getStatus(data.startTime, data?.endTime, data?.refundable, data?.claimable)

  const { secondsRemaining } = useCountdown(Math.floor(status === "upcoming" ? Number(data.startTime) : Number(data.endTime)))
  const countdown = formatRoundTime(secondsRemaining)

  return (
		<StyledCard>
      <Box p="20px">
        <Flex justifyContent="space-between" mb="14px">
          <Box position="relative">
            <StyledLogo size="56px" srcs={[data.logoUrl]} alt={data.token} />
            <StyledChainLogo>
              <ChainLogo chainId={data.chainId} />
            </StyledChainLogo>
          </Box>
          <Flex flexDirection="column" alignItems="center">
            <Badge status={status}>
              {statusText}
            </Badge>
          </Flex>
        </Flex>
        {data.presaleType === "standard" && searchBuyToken && <Box mb="1rem">
          <Text fontSize="26px">{data.tokenName}</Text>
          <Text>1 {searchBuyToken.symbol} = {(data.rate / BigInt(10 ** Number(data.tokenDecimals))).toLocaleString()} {data.tokenSymbol}</Text>
        </Box>}
        {data.presaleType === "fair" && searchBuyToken && <Box mb="1rem">
          <Text fontSize="26px">{data.tokenName}</Text>
          <Text>Fair Launch {data.maxBuy !== BigInt(0) ? `- Max Buy ${data.maxBuy} ${searchBuyToken.symbol}` : ""}</Text>
        </Box>}
        {data.presaleType === "standard" && searchBuyToken && <Box mb="0.5rem">
          <Text color="primary" fontSize="12px">Soft/Hard</Text>
          <Text color="failure" fontSize="20px">{(data.softCap / BigInt(10**searchBuyToken.decimals)).toLocaleString()} {searchBuyToken.symbol} - {(data.hardCap / BigInt(10**searchBuyToken.decimals)).toLocaleString()} {searchBuyToken.symbol}</Text>
        </Box>}
        {data.presaleType === "fair" && searchBuyToken && <Box mb="0.5rem">
          <Text color="primary" fontSize="12px">Soft</Text>
          <Text color="failure" fontSize="20px">{(data.softCap / BigInt(10**searchBuyToken.decimals)).toLocaleString()} {searchBuyToken.symbol}</Text>
        </Box>}
        {searchBuyToken && <Box mb="0.5rem">
          <Text color="primary" fontSize="12px">Progress {`(${(data.amount / (data.presaleType === "standard" ? data.hardCap : data.softCap) * BigInt(100)).toLocaleString()}%)`}</Text>
          <ProgressBase cap={data.presaleType === "standard" ? data.hardCap : data.softCap} pos={data.amount}>
            <ProgressBar cap={data.presaleType === "standard" ? data.hardCap : data.softCap} pos={data.amount} />
          </ProgressBase>
          <Flex justifyContent="space-between">
            <Text color="textDisabled" fontSize="16px">{(data.amount / BigInt(10**searchBuyToken.decimals)).toLocaleString()} {searchBuyToken.symbol}</Text>
            <Text color="textDisabled" fontSize="16px">{data.presaleType === "standard" ? (data.hardCap / BigInt(10**searchBuyToken.decimals)).toLocaleString() : (data.softCap / BigInt(10**searchBuyToken.decimals)).toLocaleString()} {searchBuyToken.symbol}</Text>
          </Flex>
        </Box>}
        <Flex justifyContent="space-between">
          <Text color="primary" fontSize="16px">Liquidity</Text>
          <Text fontSize="16px">{data.liquidity !== BigInt(0) ? `${(data.liquidity / BigInt(10)).toString()} %` : "Manual listing"}</Text>
        </Flex>
        <Flex mb="0.5rem" justifyContent="space-between">
          <Text color="primary" fontSize="16px">Lockup Time</Text>
          <Text fontSize="16px">{data.liquidity !== BigInt(0) ? `${data.lockTime / BigInt(24) / BigInt(3600)} days`  : "Unlocked"}</Text>
        </Flex>
        <Divider />
        <Flex mt="20px" mb="0.5rem" justifyContent="space-between">
          <Box>
            <Text color="primary" fontSize="14px">{banText}</Text>
            <Text fontSize="12px">{status === "upcoming" || status === "live" ? countdown : countText}</Text>
          </Box>
          <Flex>
            {data.whitelist !== "" && <Link external href={data.whitelist}>
              <Button
                width="100%"
                mr="10px"
                height="36px"
              >WL</Button>
            </Link>}
            <NextLinkFromReactRouter to={`/sale/${data.address}?chain=${CHAIN_QUERY_NAME[data.chainId]}`}>
              <Button
                width="100%"
                variant="secondary"
                height="36px"
              >View</Button>
            </NextLinkFromReactRouter>
          </Flex>
        </Flex>
      </Box>
		</StyledCard>
  )
}
