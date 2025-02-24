// import { Flex, FlexProps, Link, Text, LinkProps } from 'components'
import { Flex, FlexProps } from "components/Box"
import { Link, LinkProps } from "components/Link"
import { Text } from "components/Text";

export const ChartByLabel = ({
  symbol,
  link,
  by,
  linkProps,
  ...props
}: { symbol: string; link: string; by: string; linkProps?: LinkProps } & FlexProps) => {
  return (
    <Flex alignItems="center" px="24px" {...props}>
      <Text fontSize="14px" mr="4px">
        {symbol} Chart by
      </Text>
      <Link fontSize="14px" href={link} external {...linkProps}>
        {by}
      </Link>
    </Flex>
  )
}
