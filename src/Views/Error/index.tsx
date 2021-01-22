import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LottieComponent from '../../LottieComponent';
import countLottie from '../../lottieJsons/countdown.json';
import { Step } from '../Main';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ProcessingHeader } from '../Processing';

const ErrorWrapper = styled.article`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  cursor: default;
  user-select: none;
  transition: all 4s ease-in-out;
  overflow: hidden;
`;

const ErrorLottie = styled.div`
  margin-top: 56px;
`;

interface Props {
  result: any;
  error: any;
  setStep: (step: Step) => void;
}

const Error = ({ result, error, setStep }: Props) => {
  const [openConfirm, setOpenConfirm] = useState(true);

  useEffect(() => {
    // fetch()
    if (!openConfirm) {
      setTimeout(() => {
        setStep('main');
      }, 5500);
    }
  }, [openConfirm]);

  const handleDownload = () => {
    const blob = new Blob(
      [
        `result : ${JSON.stringify(result)} ::: error : ${JSON.stringify(
          error
        )}`,
      ],
      {
        type: 'text/plain;charset=utf-8',
      }
    );
    saveAs(blob, 'errorLog.txt');
  };

  return (
    <ErrorWrapper>
      {openConfirm || (
        <>
          <ProcessingHeader style={{ color: 'white' }}>
            Error
            <p>파일 확장자가 WAV인지 확인해보세요</p>
            <p>5초 후 원래 페이지로 돌아갑니다</p>
          </ProcessingHeader>
          <ErrorLottie>
            <LottieComponent src={countLottie} w={200} h={200} loop={false} />
          </ErrorLottie>
        </>
      )}

      <Dialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'에러 로그를 다운받으시겠습니까?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            에러 로그를 메일로 보내주면 디버깅에 큰 도움이 됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenConfirm(false);
            }}
            color="secondary"
            variant="outlined"
          >
            아니요
          </Button>
          <Button
            onClick={() => {
              handleDownload();
              setOpenConfirm(false);
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            그럴게요
          </Button>
        </DialogActions>
      </Dialog>
    </ErrorWrapper>
  );
};

export default Error;
