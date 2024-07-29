import {createFileRoute, Outlet} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';

import styles from './signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout')({
  component: () => (
    <div className={cx('signup')}>
      <HeaderWithBackButton />
      <Outlet />
    </div>
  ),
});