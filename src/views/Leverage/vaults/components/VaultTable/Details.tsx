import styled from "styled-components";
import { ChevronDownIcon } from "components";
import { useMatchBreakpoints } from "contexts";

interface DetailsProps {
  actionPanelToggled: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`;

const ArrowIcon = styled((props) => <ChevronDownIcon {...props} />)`
  transform: ${({ toggled }) => (toggled ? "rotate(180deg)" : "rotate(0)")};
  height: 20px;
`;

const Details: React.FC<React.PropsWithChildren<DetailsProps>> = ({ actionPanelToggled }) => {
  const { isDesktop } = useMatchBreakpoints();

  return (
    <Container>
      {!isDesktop && "Details"}
      <ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  );
};

export default Details;
