import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import type {SearchParamFromPhase1} from '@/routes/_layout/entrance/_public/signup/_layout/2.tsx';
import {PASSWORD_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

export interface SearchParamFromPhase2 extends SearchParamFromPhase1 {
  username?: Username;
}

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/entrance/_public/signup/_layout/3',
)({
  component: GetPasswordPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase2 => {
    return {
      username:
        search.username !== 'undefined'
          ? (search.username as Username)
          : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.username)
      throw redirect({to: '/entrance/signup/2', search: {...search}});
  },
});

function GetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValid =
    PASSWORD_PATTERN.test(password) && password === confirmPassword;

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.currentTarget.value);
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            농부님이
            <br />
            사용할 비밀번호를 알려주세요
          </Heading>
        </div>
        <div className={cx('inputContainer')}>
          <LabeledInput
            label="비밀번호"
            placeholder="영문 숫자 특수문자를 포함해서 8자리 이상 입력"
            onChange={handlePasswordChange}
            value={password}
            pattern={PASSWORD_PATTERN.source}
            type="password"
          />
          <LabeledInput
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            pattern={PASSWORD_PATTERN.source}
            type="password"
          />
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/entrance/signup/4"
          disabled={!isValid}
          search={prev => ({...prev, password})}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}