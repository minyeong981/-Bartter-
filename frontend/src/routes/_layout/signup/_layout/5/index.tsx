import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import useSignupStore from '@/store/signupStore.ts';

import styles from '../../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/5/')({
  component: GetEmailPage,
});

function GetEmailPage() {
  const navigate = useNavigate({from: '/signup/5'});
  const email = useSignupStore(state => state.email) || '';
  const setEmail = useSignupStore(state => state.setEmail);
  const isValid = email.match(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  );

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function handleContinueButton() {
    setEmail(null);
    navigate({to: '/signup/6'});
  }

  return (
    <div className={cx('signup')}>
      <HeaderWithBackButton />
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br />
          이메일을 알려주세요
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="이메일 (선택 사항)"
          placeholder="이메일을 입력해주세요"
          onChange={handleEmailChange}
          type="email"
          value={email}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup/6"
          disabled={!isValid}
        >
          다음
        </LinkButton>
        <GeneralButton
          buttonStyle={{style: 'outlined', size: 'large'}}
          onClick={handleContinueButton}
        >
          건너뛰기
        </GeneralButton>
      </div>
    </div>
  );
}