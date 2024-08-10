import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import Lottie from 'react-lottie-player';

import greetingAnimation from '@/assets/lottie/greeting.json';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import type {SearchParamFromPhase7} from '@/routes/_layout/signup/_layout/8.tsx';

import styles from '../signup.module.scss';

export interface SearchParamFromPhase8 extends SearchParamFromPhase7 {
  success: boolean;
}

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/9')({
  component: greetingPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase8 => {
    return {
      success:
        search.success !== 'undefined' ? (search.success as boolean) : false,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.success) throw redirect({to: '/signup/8', search: {...search}});
  },
});

function greetingPage() {
  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>농부님, 환영합니다!</Heading>
        </div>
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
    </div>
  );
}