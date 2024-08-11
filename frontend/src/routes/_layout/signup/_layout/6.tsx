import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import type {SearchParamFromPhase4} from '@/routes/_layout/signup/_layout/5.tsx';
import {NUMBER_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamFromPhase5 extends SearchParamFromPhase4 {
  gender?: Gender;
}

export const Route = createFileRoute('/_layout/signup/_layout/6')({
  component: GetPhoneNumberPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase5 => {
    return {
      name: search.name !== 'undefined' ? (search.name as Name) : undefined,
      username:
        search.username !== 'undefined'
          ? (search.username as Username)
          : undefined,
      password:
        search.password !== 'undefined'
          ? (search.password as Password)
          : undefined,
      birth: search.birth !== 'undefined' ? (search.birth as Birth) : undefined,
      gender:
        search.gender !== 'undefined' ? (search.gender as Gender) : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.gender) throw redirect({to: '/signup/5', search: {...search}});
  },
});

function GetPhoneNumberPage() {
  const [phoneNumber, setPhoneNumber] = useState<Phone>('');
  const isValid = phoneNumber.match(NUMBER_PATTERN);

  function handlePhoneNumberChange(e: ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.currentTarget.value);
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
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
            placeholder="01012345678"
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
            type="tel"
            pattern={NUMBER_PATTERN.source}
          />
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup/7"
          disabled={!isValid}
          search={prev => ({...prev, phoneNumber})}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}