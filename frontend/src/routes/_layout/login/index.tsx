import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';

import {ImageLogo} from '@/assets/image';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import GeneralInput from '@/components/Inputs/GeneralInput.tsx';
import useLoginForm from '@/hooks/useLoginForm.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';
import {PASSWORD_PATTERN, USERID_PATTERN} from '@/util/validation.ts';

import styles from './login.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/login/')({
  component: LoginPage,
});

function LoginPage() {
  const {form, handleUsernameChange, handlePasswordChange} = useLoginForm();
  const login = useRootStore(state => state.login);
  const isValid =
    form.username.match(USERID_PATTERN) &&
    form.password.match(PASSWORD_PATTERN);

  function handleUsername(e: ChangeEvent<HTMLInputElement>) {
    handleUsernameChange(e.currentTarget.value);
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    handlePasswordChange(e.currentTarget.value);
  }

  async function handleLogin() {
    const response = await barter.login(form);
    const accessToken = parser.getAccessToken(response);
    login(accessToken);
  }

  return (
    <div className={cx('login')}>
      <HeaderWithBackButton />
      <div className={cx('logo-container')}>
        <img src={ImageLogo} alt="logo image" />
      </div>
      <form className={cx('form-container')}>
        <GeneralInput
          placeholder="아이디"
          onChange={handleUsername}
          value={form.username}
          pattern={USERID_PATTERN.source}
        />
        <GeneralInput
          placeholder="비밀번호"
          onChange={handlePassword}
          value={form.password}
          pattern={USERID_PATTERN.source}
        />
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick={handleLogin}
          disabled={!isValid}
        >
          로그인
        </GeneralButton>
        <LinkButton buttonStyle={{style: 'mono', size: 'large'}} to="/signup">
          회원가입
        </LinkButton>
      </form>
    </div>
  );
}