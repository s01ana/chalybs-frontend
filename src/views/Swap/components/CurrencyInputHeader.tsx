import { Button, Flex, NextLinkFromReactRouter, Text, IconButton, ChartDisableIcon, ChartIcon } from 'components'
import { ReactElement, useContext } from 'react'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { CurrencyInputHeader as AtomCurrencyInputHeader } from 'components/CurrencyInputHeader'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'
import styled from 'styled-components'
import { SwapFeaturesContext } from '../SwapFeaturesContext'

const ColoredIconButton = styled(IconButton as any)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

interface Props {
  title: string | ReactElement
  isSettingDisplayed?: boolean
  isChartDisplayed?: boolean
  setIsChartDisplayed?: (isOpen: boolean) => void | null;
}

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  isSettingDisplayed = true,
}) => {
  const { isChartSupported, isChartDisplayed, setIsChartDisplayed } = useContext(SwapFeaturesContext)
  const toggleChartDisplayed = (a: boolean) => {
    setIsChartDisplayed(!a)
  }
  const titleContent = (
    <Flex width="100%" alignItems="center" justifyContent="space-between" flexDirection="row">
      <Flex>
        <Text ml="8px" fontSize="18px"><>{title}</></Text>
        {/* <Button
          as={NextLinkFromReactRouter}
          to='/swap'
          variant={title === "Swap" ? 'secondary' : 'text'}
          width="70px"
          height="36px"
        >
          <Text>Swap</Text>
        </Button>
        <Button
          as={NextLinkFromReactRouter}
          to='/liquidity'
          variant={title === "Liquidity" ? 'secondary' : 'text'}
          width="90px"
          height="36px"
        >
          <Text>Liquidity</Text>
        </Button> */}
      </Flex>
      <Flex justifyContent="end">
        {/* <ColoredIconButton
          onClick={() => {
            toggleChartDisplayed(isChartDisplayed)
          }}
          variant="text"
          scale="sm"
        >
          {isChartDisplayed ? <ChartDisableIcon color="textSubtle" /> : <ChartIcon width="24px" color="textSubtle" />}
        </ColoredIconButton> */}
        {isSettingDisplayed && <GlobalSettings color="textSubtle" mr="0" mode={SettingsMode.SWAP_LIQUIDITY} />}
      </Flex>
    </Flex>
  )

  return <AtomCurrencyInputHeader title={titleContent} subtitle={<></>} />
}

export default CurrencyInputHeader
