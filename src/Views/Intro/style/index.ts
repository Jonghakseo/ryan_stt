import styled from 'styled-components';

export const IntroPageWrapper = styled.article<any>`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  cursor: default;
  user-select: none;
  transition: opacity 1.3s ease-in;
  background: linear-gradient(
    35deg,
    rgba(100, 251, 211, 1) 10%,
    rgba(0, 213, 250, 1) 40%,
    rgba(0, 164, 255, 1) 69%,
    rgba(35, 90, 255, 1) 100%
  );
  overflow: hidden;
`;

export const IntroHeader = styled.h1<any>`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  opacity: 0;
  transition: all 2s ease;

  p {
    text-align: right;
    padding-top: 16px;
    font-weight: 600;
    font-size: 12px;
  }
`;

export const IntroSGSGLogo = styled.img<any>`
  @keyframes opa {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  object-fit: cover;
  /* box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1); */
  width: 400px;
  height: 400px;
  animation-name: opa;
  animation-duration: 4s;
`;
