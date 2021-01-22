import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import React, { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import {
  ResultTextBox,
  ResultWrapper,
  SuccessBox,
  ResultLottieWrapper,
  ResultFaidInDiv,
} from './style';
import downLottie from '../../lottieJsons/down.json';
import resultLottie from '../../lottieJsons/successBig.json';
import bgLottie from '../../lottieJsons/resultbg.json';
import LottieComponent from '../../LottieComponent';
import { ClaimButton, MainHeading } from '../Main/style';
import { Step } from '../Main';
import useWindowDimensions from '../../hooks/useWindowDimension';

const seperator = '==//==';

interface Props {
  result: any;
  setStep: (step: Step) => void;
}

const Result = ({ result, setStep }: Props) => {
  const { width, height } = useWindowDimensions();
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const script = result?.data?.split(seperator)[1];
  const remote = require('electron').remote;

  useEffect(() => {
    const win = remote.getCurrentWindow();
    win.flashFrame(true);
    console.log(win);
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.setAttribute('style', `height: 0px; padding:0;`);
      }
    }, 1200);

    setTimeout(() => {
      if (!script) {
        setStep('error');
      } else {
        setFadeIn(true);
      }
    }, 2100);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'txt.txt');
  };

  const handleClaim = () => {
    const { shell } = remote;
    shell.openExternal('mailto:unqocn@gmail.com');
  };

  return (
    <>
      <ResultWrapper>
        <ResultLottieWrapper ref={lottieRef}>
          <LottieComponent src={resultLottie} w={512} h={512} loop={false} />
        </ResultLottieWrapper>
        <ResultFaidInDiv style={{ opacity: fadeIn ? 1 : 0 }}>
          <MainHeading>완료되었습니다</MainHeading>
          <ResultTextBox>
            <SuccessBox defaultValue={script} />
          </ResultTextBox>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              color="default"
              size={'large'}
              component="span"
              variant={'contained'}
              style={{ backgroundColor: 'white' }}
              onClick={handleDownload}
            >
              <LottieComponent src={downLottie} w={12} />
              <span
                style={{ marginLeft: '8px' }}
              >{`텍스트 파일로 다운로드`}</span>
            </Button>
            <Button
              color="default"
              size={'large'}
              component="span"
              variant={'contained'}
              startIcon={<HomeIcon />}
              style={{ backgroundColor: 'white' }}
              onClick={() => {
                setStep('main');
              }}
            >
              다른 파일 변환하기
            </Button>
          </div>
          <ClaimButton
            onClick={handleClaim}
            style={{
              margin: '72px 0 0 auto',
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
              color: '#111111',
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            <MailIcon style={{ height: '16px' }} htmlColor={'#111111'} />
            <p>뭔가 문제가 있나요...?</p>
          </ClaimButton>
        </ResultFaidInDiv>
      </ResultWrapper>
      <div style={{ position: 'absolute', top: '0', left: '0', zIndex: 1 }}>
        <LottieComponent src={bgLottie} w={width} h={height} />
      </div>
    </>
  );
};

export default Result;
