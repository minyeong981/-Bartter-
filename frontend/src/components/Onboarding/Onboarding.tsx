import Logo from '@/assets/image/logo.png';
import OnboardingCommunity from '@/assets/image/onboardingCommunity.png';
import OnboardingStory from '@/assets/image/onboardingStory.png';
import OnboardingTrade from '@/assets/image/onboardingTrade.png';

import OnboardingCarousel from './OnboardingCarousel';

const slides = [
  {
    image: Logo,
    text: (
    <>
        밭터는 내가 키운 작물을 기록하고, <br />
        이웃과 교환하는 서비스 입니다
    </>),
  },
  {
    image: OnboardingTrade,
    text: (
      <>
        내가 키운 작물을 이웃과 교환해보세요! <br />
        <span>물물 교환 또는 나눔을 할 수 있어요!</span>
      </>
    ),
  },
  {
    image: OnboardingStory,
    text: (
      <>
        내가 키운 작물의 스토리를 만들어 보세요! <br />
        <span>성장 일지를 한 눈에 볼 수 있어요!</span>
      </>
    ),
  },
  {
    image: OnboardingCommunity,
    text: (
      <>
        동네 이웃과 이야기를 나눠보세요! <br />
        <span>동네 소식을 알 수 있어요!</span>
      </>
    ),
  },
];

export default function Onboarding({ onSlideChange }: { onSlideChange: (index: number) => void }) {
  return (
    <div>
      <OnboardingCarousel slides={slides} onSlideChange={onSlideChange} />
    </div>
  );
}
