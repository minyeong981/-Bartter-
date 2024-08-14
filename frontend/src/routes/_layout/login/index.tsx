import {useMutation} from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent, FormEvent} from 'react';

import {ImageLogo} from '@/assets/image';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import GeneralInput from '@/components/Inputs/GeneralInput.tsx';
import {getFcmToken} from '@/config/firebaseConfig';
import useLoginForm from '@/hooks/useLoginForm.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import axios from '@/util/axios.ts';
import parser from '@/util/parser.ts';
import {PASSWORD_PATTERN, USERNAME_PATTERN} from '@/util/validation.ts';

import styles from './login.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/login/')({
  component: LoginPage,
});

function LoginPage() {
  const {form, handleUsernameChange, handlePasswordChange} = useLoginForm();
  const login = useRootStore(state => state.login);
  const navigate = useNavigate({from: '/login'});
  const mutation = useMutation({
    mutationFn: barter.login,
    onSuccess: async data => {
      const token = parser.getAccessToken(data);

      const fcmToken = getFcmToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // FCM 토큰을 백엔드 서버로 전송
        axios.post('/user/fcm', sessionStorage.getItem('fcmToken'), {
          headers: {'Content-Type': 'application/json'},
        });
      } else {
        console.warn(
          'FCM 토큰을 가져올 수 없습니다. 권한이 없거나 문제가 발생했습니다.',
        );
      }

      login(token);
      await navigate({to: '/'});
    },
    onError: e => {
      console.error(e);
    },
  });

  const isValid =
    USERNAME_PATTERN.test(form.username) &&
    PASSWORD_PATTERN.test(form.password);

  function handleUsername(e: ChangeEvent<HTMLInputElement>) {
    handleUsernameChange(e.currentTarget.value);
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    handlePasswordChange(e.currentTarget.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(form);
  }

  return (
    <div className={cx('login')}>
      <HeaderWithBackButton />
      <div className={cx('logo-container')}>
        <img src={ImageLogo} alt="logo image" />
      </div>
      <form className={cx('form-container')} onSubmit={handleSubmit}>
        <GeneralInput
          placeholder="아이디"
          onChange={handleUsername}
          value={form.username}
          // pattern={USERID_PATTERN.source}
        />
        <GeneralInput
          placeholder="비밀번호"
          onChange={handlePassword}
          value={form.password}
          // pattern={USERID_PATTERN.source}
        />
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          disabled={!isValid}
          type="submit"
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