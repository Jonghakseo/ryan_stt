import React, { useEffect, useRef, useState } from 'react';
import { IntroHeader, IntroPageWrapper } from './style';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LottieComponent from '../../LottieComponent';
import introLottie from '../../lottieJsons/intro.json';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export interface Props {
  history: any;
}

const Intro = ({ history }: Props) => {
  const headerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (headerRef.current) {
      setTimeout(() => {
        headerRef.current.setAttribute('style', 'opacity: 1');
        setShowButton(true);
      }, 200);
    }
  }, [headerRef.current]);

  const handlePushMain = () => {
    setFadeOut(true);
    setShowButton(false);
    setTimeout(() => {
      history.push('/main');
    }, 1800);
  };

  return (
    <IntroPageWrapper style={{ opacity: fadeOut ? 0 : 1 }}>
      <IntroHeader ref={headerRef} style={{ opacity: fadeOut ? 0 : 1 }}>
        녹취록 작성기
        <p>by Ryan</p>
      </IntroHeader>
      <LottieComponent
        src={introLottie}
        w={800}
        h={300}
        style={{ opacity: showButton ? 1 : 0, transition: 'all 1s ease' }}
      />
      <Button
        style={{
          color: '#1b1a27',
          opacity: showButton ? 1 : 0,
          transition: 'all 2s ease',
        }}
        size="large"
        className={classes.margin}
        onClick={handlePushMain}
      >
        시작
      </Button>
    </IntroPageWrapper>
  );
};

export default Intro;
