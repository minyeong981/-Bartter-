import {createFileRoute, Outlet} from '@tanstack/react-router';
import classnames from 'classnames/bind'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';

import styles from './write.module.scss'

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/trade/write/_layout')({
  component: WriteLayout,
});

function WriteLayout() {
  return (
    <div className={cx('writeLayout')}>
      <HeaderWithLabelAndBackButton label="글 작성하기" />
      <Outlet />
    </div>
  );
}