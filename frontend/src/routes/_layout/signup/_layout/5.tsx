import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import BinaryButton from '@/components/BinaryButton';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import type {SearchParamFromPhase3} from '@/routes/_layout/signup/_layout/4.tsx';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamFromPhase4 extends SearchParamFromPhase3 {
  birth?: Birth;
}

export const Route = createFileRoute('/_layout/signup/_layout/5')({
  component: GetGenderPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase4 => {
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
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.birth) throw redirect({to: '/signup/4', search: {...search}});
  },
});

function GetGenderPage() {
  const [gender, setGender] = useState<Gender>();

  function handleSelectGender(gender: string) {
    setGender(gender as Gender);
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            농부님의
            <br />
            성별을 알려주세요
          </Heading>
        </div>
      </div>
      <div className={cx('inputContainer')}>
        <BinaryButton
          value1="M"
          label1="남성"
          value2="F"
          label2="여성"
          onSelect={handleSelectGender}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          disabled={!gender}
          to="/signup/6"
          search={prev => ({...prev, gender})}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}