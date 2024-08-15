import {useQuery} from '@tanstack/react-query';
import {createFileRoute, redirect} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import barter from '@/services/barter.ts';
import {USERNAME_PATTERN} from '@/util/validation.ts';

import styles from '../signup.module.scss';

export interface SearchParamFromPhase1 {
  nickname?: Nickname;
}

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/entrance/_public/signup/_layout/2',
)({
  component: GetUserId,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase1 => {
    return {
      nickname:
        search.nickname !== 'undefined'
          ? (search.nickname as Nickname)
          : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.nickname) throw redirect({to: '/entrance/signup/1'});
  },
});

function GetUserId() {
  const [username, setUsername] = useState('');
  const {data} = useQuery({
    queryKey: ['user', 'username', username],
    queryFn: () => barter.getUsernameExist(username),
    enabled: !!username,
  });
  const isExist = data?.data.data;
  const isValid = USERNAME_PATTERN.test(username);

  function handleUserIdChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            농부님이 사용할
            <br />
            아이디를 알려주세요
          </Heading>
        </div>
        <div className={cx('inputContainer')}>
          <div>
            <LabeledInput
              label="아이디"
              placeholder="아이디를 입력해주세요 (8자 이상)"
              onChange={handleUserIdChange}
              value={username}
              pattern={USERNAME_PATTERN.source}
            />
            {isExist && (
              <div className={cx('errorText')}>이미 사용중인 아이디입니다.</div>
            )}
          </div>
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/entrance/signup/3"
          search={prev => ({...prev, username: username})}
          disabled={!isValid || isExist}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}
