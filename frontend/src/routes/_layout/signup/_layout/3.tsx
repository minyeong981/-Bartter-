import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import BinaryButton from '@/components/BinaryButton';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import type {Gender} from '@/store/signupStore.ts';
import useSignupStore from '@/store/signupStore.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/3')({
  component: GetGenderPage,
});

function GetGenderPage() {
  const gender = useSignupStore(state => state.gender);
  const setGender = useSignupStore(state => state.setGender);

  function handleSelectGender(gender: string) {
    setGender(gender as Gender);
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br />
          성별을 알려주세요
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <BinaryButton
          value1="남성"
          value2="여성"
          onSelect={handleSelectGender}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          disabled={!gender}
          to="/signup/4"
        >
          다음
        </GeneralButton>
      </div>
    </>
  );
}