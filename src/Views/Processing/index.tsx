import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimension';
import LottieComponent from '../../LottieComponent';
import background from '../../lottieJsons/backgrounduniv.json';
// import loading from '../../lottieJsons/su.json';

const ProcessingWrpper = styled.article`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  justify-items: center;
  align-items: center;
  cursor: default;
  user-select: none;
  transition: all 4s ease-in-out;
  overflow: hidden;
`;

export const ProcessingHeader = styled.h1<any>`
  ${(props: any) => {
    return props.isWhite && 'color: white';
  }};
  position: fixed;
  top: 15vh;
  left: 15vw;
  font-size: 40px;
  transition: all 4s ease-in-out;

  p {
    &:first-child {
      padding-top: 16px;
    }
    padding-top: 8px;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Processing = () => {
  const { width } = useWindowDimensions();
  const [colorInt, setColorInt] = useState<{ number: number }>({ number: 0 });
  const [headerColor, setHeaderColor] = useState(false);
  // const
  useEffect(() => {
    setTimeout(() => {
      const colorInt = Math.round(Math.random() * 4);
      const nuwNum = { number: colorInt };
      console.log('change');
      setColorInt(nuwNum);
    }, 5000);
  }, [colorInt]);

  const backgroundColor = useMemo(() => {
    switch (colorInt.number) {
      case 1:
        setHeaderColor(false);
        return 'rgb(0, 164, 255)';
      case 2:
        setHeaderColor(false);
        return 'rgb(245, 194, 53)';
      case 3:
        setHeaderColor(true);
        return 'rgb(0, 251, 211)';
      default:
        setHeaderColor(true);
        return '#092e9e';
    }
  }, [colorInt]);

  return (
    <ProcessingWrpper style={{ backgroundColor: backgroundColor }}>
      <ProcessingHeader isWhite={headerColor}>
        텍스트로 변환중...
        <p>음성 녹음의 길이에 따라 소요시간이 다를 수 있습니다.</p>
        <p>(평균 녹음파일 길이의 20~30% 소요)</p>
      </ProcessingHeader>
      <LottieComponent
        src={background}
        w={width}
        style={{ justifySelf: 'flex-end', marginTop: 'auto' }}
      />
    </ProcessingWrpper>
  );
};

export default Processing;
