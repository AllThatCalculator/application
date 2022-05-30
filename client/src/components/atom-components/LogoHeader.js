import styled from "styled-components";
import { React } from "react";
import styles from "../styles.js";
const StyledDiv = styled.div`
  display: flex;
  color: ${styles.styleColor.white300};
  ${styles.sytleText.LogoTitle}
  ${styles.styleEffect.opacity200};
  min-width: max-content;
  align-items: center;
`;
/**
 *
 * 헤더에 놓을 로고를 반환하는 함수
 */
function LogoHeader() {
  return (
    <>
      <StyledDiv>All That Calculator</StyledDiv>
    </>
  );
}
export default LogoHeader;