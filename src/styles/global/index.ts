import styled from "@emotion/styled";

const CenteredContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const CenteredTop = styled.div`
  text-align: center;
`;

export { CenteredContent, CenteredTop };
