import styled from 'styled-components';

export const ResultWrapper = styled.article`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  cursor: default;
  user-select: none;
  transition: all 2s ease-in-out;
  overflow: hidden;
`;

export const ResultLottieWrapper = styled.div`
  padding-top: 20%;
  height: 512px;
  transition: all 0.9s ease-in-out;
  overflow: hidden;
`;

export const ResultFaidInDiv = styled.div`
  transition: all 1.3s ease-in-out;
`;

export const ResultTextBox = styled.section`
  z-index: 1;
  padding: 32px 0;
`;

export const SuccessBox = styled.textarea`
  border-radius: 8px;
  border: solid 8px transparent;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  width: 500px;
  min-height: 200px;
  max-height: 300px;
  font-family: 'Noto Sans KR', sans-serif;
  white-space: pre-wrap;
  word-break: keep-all;
  outline: none;
`;
