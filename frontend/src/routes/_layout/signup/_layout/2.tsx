import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import {USERID_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

export interface SearchParamFromPhase1 {
  name?: Name;
}

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/2')({
  component: GetUserId,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase1 => {
    return {
      name: search.name !== 'undefined' ? (search.name as Name) : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.name) throw redirect({to: '/signup/1'});
  },
});

function GetUserId() {
  const [userId, setUserId] = useState('');
  const isValid = userId.match(USERID_PATTERN);

  function handleUserIdChange(e: ChangeEvent<HTMLInputElement>) {
    setUserId(e.currentTarget.value);
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          농부님이 사용할
          <br />
          아이디를 알려주세요
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="아이디"
          placeholder="아이디를 입력해주세요"
          onChange={handleUserIdChange}
          value={userId}
          pattern={USERID_PATTERN.source}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup/3"
          search={prev => ({...prev, userId})}
          disabled={!isValid}
        >
          다음
        </GeneralButton>
      </div>
    </>
  );
}