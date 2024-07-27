import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {ImageLogo} from '@/assets/image';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import GeneralInput from '@/components/Inputs/GeneralInput.tsx';

import styles from './login.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/login/')({
  component: () => (
    <div className={cx('login')}>
      <HeaderWithBackButton />
      <div className={cx('logo-container')}>
        <img src={ImageLogo} alt="logo image" />
      </div>
      <form className={cx('form-container')}>
        <GeneralInput placeholder="아이디" />
        <GeneralInput placeholder="비밀번호" />
        <GeneralButton buttonStyle={{style: 'primary', size: 'large'}}>
          로그인
        </GeneralButton>
        <GeneralButton buttonStyle={{style: 'mono', size: 'large'}}>
          회원가입
        </GeneralButton>
      </form>
    </div>
  ),
});