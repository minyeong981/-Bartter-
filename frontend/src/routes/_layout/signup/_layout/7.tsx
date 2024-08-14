import {createFileRoute, redirect, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import type {SearchParamFromPhase5} from '@/routes/_layout/signup/_layout/6.tsx';
import {EMAIL_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamFromPhase6 extends SearchParamFromPhase5 {
  phoneNumber?: Phone;
}

export const Route = createFileRoute('/_layout/signup/_layout/7')({
  component: GetEmailPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase6 => {
    return {
      phoneNumber: search.phoneNumber
        ? (search.phoneNumber as Phone)
        : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.phoneNumber)
      throw redirect({to: '/signup/6', search: {...search}});
  },
});

function GetEmailPage() {
  const navigate = useNavigate({from: '/signup/7'});
  const [email, setEmail] = useState<Email>('');
  const isValid = email.match(EMAIL_PATTERN);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  async function handleContinueButton() {
    await navigate({to: '/signup/8', search: prev => ({...prev})});
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
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
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup/8"
          disabled={!isValid}
          search={prev => ({...prev, email})}
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