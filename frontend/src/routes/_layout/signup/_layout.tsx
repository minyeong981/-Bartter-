import {createFileRoute, Outlet, useLocation} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import ProgressBar from '@/components/ProgressBar';

import styles from './signup.module.scss';

const TOTAL_STEPS = 8;

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout')({
  component: SignupLayout,
});

function SignupLayout() {
  const {pathname} = useLocation();
  const step = Number(pathname.split('/')[2]);

  return (
    <div className={cx('signup')}>
      <HeaderWithBackButton />
      <ProgressBar current={step} total={TOTAL_STEPS} />
      <Outlet />
    </div>
  );
}