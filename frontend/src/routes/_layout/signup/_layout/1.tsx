import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import useSignupStore from '@/store/signupStore.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);
export const Route = createFileRoute('/_layout/signup/_layout/1')({
  component: GetNamePage,
});

function GetNamePage() {
  const name = useSignupStore(state => state.nickname);
  const setName = useSignupStore(state => state.setNickname);
  const isValid = name.length >= 2;

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br />
          이름을 알려주세요
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="이름"
          placeholder="이름을 입력해주세요"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup/2"
          disabled={!isValid}
        >
          다음
        </GeneralButton>
      </div>
    </>
  );
}