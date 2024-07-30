import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import useStore from "@/store";
import {BIRTH_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/4')({
  component: GetBirthPage,
});

function GetBirthPage() {
  const birth = useStore(state => state.birth);
  const setBirth = useStore(state => state.setBirth);
  const isValid = birth.match(BIRTH_PATTERN);

  function handleBirthChange(e: ChangeEvent<HTMLInputElement>) {
    setBirth(e.currentTarget.value);
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br/>
          생일을 알려주세요
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="생년월일"
          placeholder="19980801"
          onChange={handleBirthChange}
          value={birth}
          pattern={BIRTH_PATTERN.source}
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
    </>
  );
}