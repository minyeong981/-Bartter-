import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import Lottie from 'react-lottie-player';

import greetingAnimation from '@/assets/lottie/greeting.json';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import type {SearchParamFromPhase7} from '@/routes/_layout/signup/_layout/8.tsx';

import styles from '../signup.module.scss';

interface SearchParamFromPhase8 extends SearchParamFromPhase7 {
  success: boolean;
}

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/9')({
  component: greetingPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase8 => {
    return {
      name: search.name ? (search.name as Name) : undefined,
      userId: search.userId ? (search.userId as UserId) : undefined,
      password: search.password ? (search.password as Password) : undefined,
      birth: search.birth ? (search.birth as Birth) : undefined,
      gender: search.gender ? (search.gender as Gender) : undefined,
      phoneNumber: search.phoneNumber
        ? (search.phoneNumber as Phone)
        : undefined,
      email: search.email ? (search.email as Email) : undefined,
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