import {createFileRoute, Outlet, useLocation} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import ProgressBar from '@/components/ProgressBar';

import styles from './registerCrop.module.scss';

const TOTAL_STEPS = 4;

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/_layout')({
  component: RegisterCropLayout,
});

function RegisterCropLayout() {
  const {pathname} = useLocation();
  const step = Number(pathname.split('/')[3]); // /diary/registerCrop/1 같은 형태의 경로에서 단계 번호를 추출

  // 5단계에서는 프로그레스 바 숨기기
  const showProgressBar = step <= TOTAL_STEPS;

  return (
    <div className={cx('registerCrop')}>
      <div className={cx('headerButton')}>
        {step < 5 ? <HeaderWithBackButton /> : undefined}
      </div>
      <div className={cx('progressbar', { hidden: !showProgressBar })}>
        {showProgressBar && <ProgressBar current={step} total={TOTAL_STEPS} />}
      </div>
      <Outlet />
    </div>
  );
}
