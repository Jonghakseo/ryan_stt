import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  MainContentWrapper,
  MainHeading,
  MainPageWrapper,
  FileInfoSection,
  ClaimButton,
} from './style';
import mainLottie from '../../lottieJsons/main.json';
import LottieComponent from '../../LottieComponent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useWindowDimensions from '../../hooks/useWindowDimension';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Processing from '../Processing';
import Result from '../Result';
import Error from '../Error';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const url = 'http://192.168.219.123';
// const url = 'https://unqocn.hopto.org';

export interface Props {
  history: any;
}

export type Step = 'main' | 'processing' | 'result' | 'error';

const Main = ({ history }: Props) => {
  const remote = require('electron').remote;
  const infoRef = useRef<HTMLDivElement | null>(null);
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [step, setStep] = useState<Step>('main');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [result, setResult] = useState<any>();
  const [error, setError] = useState(null);

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => {
      if (infoRef.current) {
        const { scrollHeight } = infoRef.current;
        console.log(scrollHeight);
        infoRef.current.setAttribute(
          'style',
          `padding: 8px 16px; height: ${scrollHeight * 2}px; `
        );
      }
    }, 1200);
    setTimeout(() => {
      if (infoRef.current) {
        infoRef.current.setAttribute(
          'style',
          `padding: 8px 16px; height: auto; `
        );
      }
    }, 2400);
  }, []);

  useEffect(() => {
    if (step === 'main') {
      setFile(null);
      setError(null);
      setResult(null);
    }
  }, [step]);

  useEffect(() => {
    if (file) {
      setOpenConfirm(true);
    } else {
      setOpenConfirm(false);
    }
  }, [file]);

  const handleClaim = () => {
    const { shell } = remote;
    shell.openExternal('mailto:unqocn@gmail.com');
  };

  const postFile = async () => {
    setStep('processing');
    let formData = new FormData();
    if (file) formData.append('upfile', file);

    try {
      const res = await axios.post(
        `${url}/record/record/upload_electron.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res);
      setResult(res);
      setStep('result');
    } catch (e) {
      setError(e);
      setStep('error');
    }
  };

  const handleUploadAudio = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      const kb = file.size / 1024;
      const mb = kb / 1024;
      if (mb > 1) {
        setFileSize(`${mb.toFixed(1)} MB`);
      } else {
        setFileSize(`${kb.toFixed(1)} KB`);
      }
      setFile(file);
    }
  };

  const renderSwitch = () => {
    switch (step) {
      case 'main':
        return (
          <MainPageWrapper id="mainWrapper" style={{ opacity: fadeIn ? 1 : 0 }}>
            <MainContentWrapper id="contentWrapper">
              <MainHeading>녹음 파일을 골라주세요</MainHeading>
              <FileInfoSection ref={infoRef}>
                <div>
                  <p>파일명</p>
                  <p>{file ? file.name : ``}</p>
                </div>
                <div>
                  <p>파일크기</p>
                  <p>{fileSize ? fileSize : ``}</p>
                </div>
              </FileInfoSection>

              <input
                accept="audio/wav"
                className={classes.input}
                id="contained-button-file"
                onChange={handleUploadAudio}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  startIcon={<CloudUploadIcon />}
                  variant={'contained'}
                  color="default"
                  size={'large'}
                  component="span"
                  style={{ backgroundColor: '#fafafa' }}
                >
                  올리기
                </Button>
              </label>
              {file && (
                <Button
                  color="secondary"
                  size={'large'}
                  variant={'contained'}
                  component="span"
                  onClick={postFile}
                  style={{ marginTop: '24px' }}
                >
                  전송
                </Button>
              )}
              <ClaimButton
                onClick={handleClaim}
                style={{
                  margin: '72px auto 0 auto',
                  width: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignSelf: 'center',
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
            </MainContentWrapper>

            <LottieComponent src={mainLottie} w={width} />

            <Dialog
              open={openConfirm}
              onClose={() => {
                setOpenConfirm(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'이 파일이 맞나요?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {`파일 이름 : ${file?.name}\n파일 크기 : ${fileSize}`}
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
                    postFile();
                    setOpenConfirm(false);
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  이 파일이 맞아요
                </Button>
              </DialogActions>
            </Dialog>
          </MainPageWrapper>
        );

      case 'processing':
        return <Processing />;

      case 'result':
        return <Result result={result} setStep={setStep} />;

      case 'error':
        return <Error result={result} error={error} setStep={setStep} />;

      default:
        return <Error result={result} error={error} setStep={setStep} />;
    }
  };

  return renderSwitch();
};

export default Main;
