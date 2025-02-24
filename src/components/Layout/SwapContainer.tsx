import { Box, BoxProps } from '../Box'

const SwapContainer: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => (
  <Box px={['16px', '24px']} mx="auto" maxWidth="1600px" {...props}>
    {children}
  </Box>
)

export default SwapContainer
