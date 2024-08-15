import classnames from 'classnames/bind';
import {useState} from 'react';
import Lottie from 'react-lottie-player';

import Logo from '@/assets/image/logo.png';
import HandScroll from '@/assets/lottie/handScroll.json';
import onBoardingCommunity from '@/assets/lottie/onBoardingCommunity.json';
import onBoardingDiary from '@/assets/lottie/onBoardingDiary.json';
import onBoardingFruits from '@/assets/lottie/onBoardingFruits.json';
import onBoardingWatermelon from '@/assets/lottie/onBoardingWatermelon.json';
import KakaoButton from '@/components/Buttons/KakaoButton.tsx';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';

import styles from './Onboarding.module.scss';
import OnboardingCarousel from './OnboardingCarousel';

const cx = classnames.bind(styles);

interface Slide {
  image?: string;
  animationData?: object;
  text: JSX.Element | string;
  className?: string;
}

interface OnboardingProps {
  onSlideChange: (index: number) => void;
}

const slides: Slide[] = [
  {
    image: Logo,
    text: (
      <>
        농작물 물물 교환 서비스 <br />
        밭터에 오신것을 환영합니다!
      </>
    ),
  },
  {
    animationData: onBoardingFruits,
    className: 'onBoardingFruits',
    text: (
      <>
        내가 키운 작물을 <br />
        이웃과 교환해보세요!
      </>
    ),
  },
  {
    animationData: onBoardingDiary,
    className: 'onBoardingDiary',
    text: (
      <>
        내가 키운 작물의 스토리를 <br />
        만들어보세요!
      </>
    ),
  },
  {
    animationData: onBoardingCommunity,
    className: 'onBoardingCommunity',
    text: (
      <>
        동네 이웃과 <br />
        이야기를 나눠보세요!
      </>
    ),
  },
  {
    animationData: onBoardingWatermelon,
    className: 'onBoardingWatermelon',
    text: '밭터, 이제 시작해볼까요?',
  },
];

const Onboarding: React.FC<OnboardingProps> = ({onSlideChange}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const isLastSlide = currentStep === slides.length - 1;

  const handleSlideChange = (index: number) => {
    setCurrentStep(index);
    onSlideChange(index);
    setIsHidden(!(index === 0)); // index가 0이면 숨김 해제
  };

  function handleKakaoButton() {
    window.open(
      import.meta.env.VITE_BASEURL + '/api/oauth2/authorization/kakao',
      '_self',
    );
  }

  return (
    <div className={cx('onboarding')}>
      <OnboardingCarousel slides={slides} onSlideChange={handleSlideChange} />
      <div
        className={cx('animation', {
          hidden: isHidden,
          'display-none': isLastSlide,
        })}
      >
        <Lottie loop animationData={HandScroll} play />
      </div>
      {isLastSlide && (
        <div className={cx('buttonContainer')}>
          <KakaoButton onClick={handleKakaoButton} />
          <GeneralButton
            buttonStyle={{style: 'primary', size: 'large'}}
            to="/entrance/login"
          >
            로그인
          </GeneralButton>
        </div>
      )}
    </div>
  );
};

export default Onboarding;