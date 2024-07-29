import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import Lottie from 'react-lottie-player';

import greetingAnimation from '@/assets/lottie/greeting.json';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/9')({
  component: greetingPage,
});

function greetingPage() {
  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>농부님, 환영합니다!</Heading>
      </div>
      <div className={cx('inputContainer')}>
        <Lottie loop animationData={greetingAnimation} play />
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/login"
        >
          로그인하러 가기
        </GeneralButton>
      </div>
    </>
  );
}