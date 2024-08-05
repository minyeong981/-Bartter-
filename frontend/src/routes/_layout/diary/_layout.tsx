import { createFileRoute, Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind';

import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import Location from '@/components/Header/Location';
import Navigation from '@/components/Navigation';

import styles from './diary.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/_layout')({
  component: Diary
})

function Diary() {
  return (
    <div className={cx('diary')}>
      <HeaderWithLabelAndButtons label={<Location location='내위치' />} />
      <Outlet/>
      <Navigation/> 
    </div>
  );
}