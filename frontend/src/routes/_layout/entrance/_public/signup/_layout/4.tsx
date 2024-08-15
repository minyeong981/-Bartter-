import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import type {SearchParamFromPhase2} from '@/routes/_layout/entrance/_public/signup/_layout/3.tsx';
import {BIRTH_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamFromPhase3 extends SearchParamFromPhase2 {
  password?: Password;
}

export const Route = createFileRoute(
  '/_layout/entrance/_public/signup/_layout/4',
)({
  component: GetBirthPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase3 => {
    return {
      password:
        search.password !== 'undefined'
          ? (search.password as Password)
          : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.password)
      throw redirect({to: '/entrance/signup/3', search: {...search}});
  },
});

function GetBirthPage() {
  const [birth, setBirth] = useState<Birth>('');
  const isValid = birth.match(BIRTH_PATTERN);

  function handleBirthChange(e: ChangeEvent<HTMLInputElement>) {
    setBirth(e.currentTarget.value);
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            농부님의
            <br />
            생일을 알려주세요
          </Heading>
        </div>
        <div className={cx('inputContainer')}>
          <LabeledInput
            label="생년월일"
            placeholder="1998-08-01"
            onChange={handleBirthChange}
            value={birth}
            pattern={BIRTH_PATTERN.source}
          />
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/entrance/signup/5"
          disabled={!isValid}
          search={prev => ({...prev, birth})}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}