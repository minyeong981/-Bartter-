import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {ImageLogo} from '@/assets/image';
import KakaoButton from '@/components/Buttons/KakaoButton.tsx';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';

import styles from './entrance.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/login/entrance')({
  component: () => (
    <div className={cx('entrance')}>
      <div className={cx('logo-container')}>
        <img src={ImageLogo} alt="logo image" />
      </div>
      <div className={cx('button-container')}>
        <KakaoButton />
        <GeneralButton buttonStyle={{style: 'primary', size: 'large'}}>
          로그인
        </GeneralButton>
      </div>
    </div>
  ),
});