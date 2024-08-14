// import {createFileRoute} from '@tanstack/react-router';
// import classnames from 'classnames/bind';

// import {ImageLogo} from '@/assets/image';
// import KakaoButton from '@/components/Buttons/KakaoButton.tsx';
// import GeneralButton from '@/components/Buttons/LinkButton.tsx';

// import styles from './entrance.module.scss';

// const cx = classnames.bind(styles);

// export const Route = createFileRoute('/_layout/login/entrance/')({
//   component: EntrancePage,
// });

// function EntrancePage() {
//   function handleKakaoButton() {
//     window.open(
//       import.meta.env.VITE_BASEURL + '/api/oauth2/authorization/kakao',
//       '_self',
//     );
//   }

//   return (
//     <div className={cx('entrance')}>
//       <div className={cx('logo-container')}>
//         <img src={ImageLogo} alt="logo image" />
//       </div>
//       <div className={cx('button-container')}>
//         <KakaoButton onClick={handleKakaoButton} />
//         <GeneralButton
//           buttonStyle={{style: 'primary', size: 'large'}}
//           to="/login"
//         >
//           로그인
//         </GeneralButton>
//       </div>
//     </div>
//   );
// }


import { createFileRoute } from '@tanstack/react-router'
import classnames from 'classnames/bind'
import { useState } from 'react'

import KakaoButton from '@/components/Buttons/KakaoButton.tsx'
import GeneralButton from '@/components/Buttons/LinkButton.tsx'
import Logo from '@/components/Header/Logo'
import Onboarding from '@/components/Onboarding/Onboarding'
import ProgressBar from '@/components/ProgressBar'

import styles from './entrance.module.scss'

const TOTAL_STEPS = 4
const cx = classnames.bind(styles)

export const Route = createFileRoute('/_layout/login/entrance/')({
  component: EntrancePage,
})

function EntrancePage() {
  const [currentStep, setCurrentStep] = useState(0) 

  function handleKakaoButton() {
    window.open(
      import.meta.env.VITE_BASEURL + '/api/oauth2/authorization/kakao',
      '_self',
    )
  }

  return (
    <>
      <Logo />
      <div className={cx('entrance')}>
          <div className={cx('logo-container')}>
            <Onboarding onSlideChange={(index) => setCurrentStep(index + 1)} />
            <div className={cx('progressbar')}>
              <ProgressBar current={currentStep} total={TOTAL_STEPS} />
            </div>
          </div>
          <div className={cx('button-container')}>
            <KakaoButton onClick={handleKakaoButton} />
            <GeneralButton buttonStyle={{ style: 'primary', size: 'large' }} to="/login">
              로그인
            </GeneralButton>
          </div>
        </div>      
    </>
    
  )
}

export default EntrancePage
