import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import useSignupStore from '@/store/signupStore.ts';

import styles from '../../signup.module.scss';

const cx = classnames.bind(styles);

const NUMBER_PATTERN = /[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;

export const Route = createFileRoute('/_layout/signup/_layout/4/')({
  component: GetPhoneNumberPage,
});

function GetPhoneNumberPage() {
  const phoneNumber = useSignupStore(state => state.phoneNumber);
  const setPhoneNumber = useSignupStore(state => state.setPhoneNumber);
  const isValid = phoneNumber.match(NUMBER_PATTERN);

  function handlePhoneNumberChange(e: ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.currentTarget.value);
  }

  return (
    <div className={cx('signup')}>
      <HeaderWithBackButton />
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br />
          전화번호를 알려주세요
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="전화번호"
          placeholder="010-1234-5678"
          onChange={handlePhoneNumberChange}
          value={phoneNumber}
          type="tel"
          pattern={NUMBER_PATTERN.source}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup/5"
          disabled={!isValid}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}