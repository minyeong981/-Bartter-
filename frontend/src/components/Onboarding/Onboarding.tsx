// import classnames from 'classnames/bind';
// import Lottie from 'react-lottie-player';

// import Logo from '@/assets/image/logo.png';
// import OnboardingCommunity from '@/assets/image/onboardingCommunity.png';
// import OnboardingStory from '@/assets/image/onboardingStory.png';
// import OnboardingTrade from '@/assets/image/onboardingTrade.png';
// import HandScroll from '@/assets/lottie/handScroll.json'

// import styles from './Onboarding.module.scss'
// import OnboardingCarousel from './OnboardingCarousel';

// const cx = classnames.bind(styles);

// const slides = [
//   {
//     image: Logo,
//     text: (
//     <>
//         밭터는 내가 키운 작물을 기록하고, <br />
//         이웃과 교환하는 서비스 입니다
//     </>),
//   },
//   {
//     image: OnboardingTrade,
//     text: (
//       <>
//         내가 키운 작물을 이웃과 교환해보세요!
//       </>
//     ),
//   },
//   {
//     image: OnboardingStory,
//     text: (
//       <>
//         내가 키운 작물의 스토리를 만들어 보세요!
//       </>
//     ),
//   },
//   {
//     image: OnboardingCommunity,
//     text: (
//       <>
//         동네 이웃과 이야기를 나눠보세요!
//       </>
//     ),
//   },
//     {
//     image: OnboardingCommunity,
//     text: (
//       <>
//         이제 밭터 시작해볼까요?
//       </>
//     ),
//   },
// ];

// export default function Onboarding({ onSlideChange }: { onSlideChange: (index: number) => void }) {
//   return (
//     <div className={cx('onboarding')}>
//       {/* <div className={cx('animation')}>
//         <Lottie
//               loop
//               animationData={HandScroll}
//               play
//             />        
//       </div> */}
//       <div>
//         <OnboardingCarousel slides={slides} onSlideChange={onSlideChange} />        
//       </div>
//       <div className={cx('animation')}>
//         <Lottie
//               loop
//               animationData={HandScroll}
//               play
//             />        
//       </div>
//     </div>
//   );
// }


import classnames from 'classnames/bind';
import { useState } from 'react';
import Lottie from 'react-lottie-player';

import Logo from '@/assets/image/logo.png'
import HandScroll from '@/assets/lottie/handScroll.json'
import onBoardingCommunity from '@/assets/lottie/onBoardingCommunity.json'
import onBoardingDiary from '@/assets/lottie/onBoardingDiary.json'
import onBoardingFruits from '@/assets/lottie/onBoardingFruits.json'
import onBoardingWatermelon from '@/assets/lottie/onBoardingWatermelon.json'
import KakaoButton from '@/components/Buttons/KakaoButton.tsx'
import GeneralButton from '@/components/Buttons/LinkButton.tsx'

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
        농작물 교환 서비스 <br />
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
    )
  },
  {
    animationData: onBoardingDiary,
    className: 'onBoardingDiary',
    text: (
      <>
        내가 키운 작물의 스토리를 <br />
        만들어보세요!
      </>
    )
  },
  {
    animationData: onBoardingCommunity,
    className: 'onBoardingCommunity',
    text: (
      <>
        동네 이웃과 <br />
        이야기를 나눠보세요!
      </>
    )
  },
  {
    animationData: onBoardingWatermelon,
    className: 'onBoardingWatermelon',
    text: "밭터, 이제 시작해볼까요?",
  },
];

const Onboarding: React.FC<OnboardingProps> = ({ onSlideChange }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentStep(index);
    onSlideChange(index);
  };

  const LAST_STEP_INDEX = slides.length - 1;

    function handleKakaoButton() {
    window.open(
      import.meta.env.VITE_BASEURL + '/api/oauth2/authorization/kakao',
      '_self',
    )
  }
  return (
    <div className={cx('onboarding')}>
      <OnboardingCarousel slides={slides} onSlideChange={handleSlideChange} />
      {currentStep < LAST_STEP_INDEX ? (
        <div className={cx('animation')}>
          <Lottie loop animationData={HandScroll} play />
        </div>) : (
        <div className={cx('buttonContainer')}>
          <KakaoButton onClick={handleKakaoButton} />
          <GeneralButton buttonStyle={{ style: 'primary', size: 'large' }} to="/login">
            로그인
          </GeneralButton>
        </div> 
        )          
      }
    </div>
  );
};

export default Onboarding;
