import styled from "styled-components";

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
`;

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
  width: 100%;
`;

interface CellLayoutProps {
  label?: string;
}

const CellLayout: React.FC<React.PropsWithChildren<CellLayoutProps>> = ({ label = "", children }) => {
  return (
    <div style={{ width: "100%" }}>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default CellLayout;
