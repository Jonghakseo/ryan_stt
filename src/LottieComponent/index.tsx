import React, { ReactElement, CSSProperties } from 'react';
import Lottie from 'react-lottie';

interface Props {
  src: any;
  h?: number;
  w?: number;
  style?: CSSProperties;
  loop?: boolean;
}

function LottieComponent({
  src,
  h,
  w,
  style,
  loop = true,
}: Props): ReactElement {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: src,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const handleClick = (e: any) => {
    // console.log(e);
    e.stopPropagation;
    e.preventDefault;
  };

  return (
    <div onClick={handleClick} style={style}>
      <Lottie
        options={defaultOptions}
        height={h}
        width={w}
        isClickToPauseDisabled={true}
      />
    </div>
  );
}

export default LottieComponent;
