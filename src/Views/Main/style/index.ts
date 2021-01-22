import styled from 'styled-components';

export const MainPageWrapper = styled.article<any>`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  cursor: default;
  user-select: none;
  transition: all 2s ease-in-out;
  background-color: #235aff;
`;

export const MainContentWrapper = styled.section<any>`
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  justify-self: flex-end;
  margin-left: auto;
  align-items: center;
  transition: all 2s ease-in-out;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const MainHeading = styled.h1<any>`
  z-index: 1;
  font-size: 40px;
  font-weight: 700;
`;

export const FileInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 0px;
  box-sizing: content-box;
  overflow: hidden;
  min-width: 50px;
  background-color: #fafafa;
  justify-content: center;
  justify-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  transition: all 1.2s ease-in-out;
  padding: 0;
  margin: 32px 0;

  div {
    font-size: 12px;
    padding: 4px;

    display: flex;
    justify-content: space-between;

    p {
      padding: 0;
      min-width: 80px;
      max-width: 150px;
      white-space: pre-wrap;
    }
  }
`;

export const ClaimButton = styled.div<any>`
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
  :hover {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
`;
