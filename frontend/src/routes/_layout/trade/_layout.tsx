import {createFileRoute, Outlet} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import Navigation from '@/components/Navigation';

import styles from './trade.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/trade/_layout')({
  component: Trade,
});

function Trade() {
  return (
    <div className={cx('trade')}>
      <HeaderWithLabelAndButtons label="장덕동" />
      <Outlet />
      <Navigation />
    </div>
  );
}