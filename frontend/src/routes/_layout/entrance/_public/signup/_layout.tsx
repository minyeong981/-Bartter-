import * as path from "node:path";

import {createFileRoute, Outlet, useLocation} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import ProgressBar from '@/components/ProgressBar';

import styles from './signup.module.scss';

const TOTAL_STEPS = 8;

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/entrance/_public/signup/_layout')({
  component: SignupLayout,
});

function SignupLayout() {
  const {pathname} = useLocation();
  const step = Number(pathname.split('/')[3]);
  console.log(pathname)

  const showProgressBar = step <= TOTAL_STEPS;

  return (
    <div className={cx('signup')}>
      <div className={cx('headerButton')}>
        {step < 9 ? <HeaderWithBackButton /> : undefined}
      </div>
      <div className={cx('progressbar', {hidden: !showProgressBar})}>
        <ProgressBar current={step} total={TOTAL_STEPS} />        
      </div>
      <Outlet />
    </div>
  );
}