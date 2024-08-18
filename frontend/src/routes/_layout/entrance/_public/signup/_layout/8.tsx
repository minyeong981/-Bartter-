import {useMutation} from '@tanstack/react-query';
import {createFileRoute, redirect, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import type {SearchParamFromPhase6} from '@/routes/_layout/entrance/_public/signup/_layout/7.tsx';
import barter from '@/services/barter.ts';
import {getPosition} from '@/util/geolocation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamFromPhase7 extends SearchParamFromPhase6 {
  email?: Email;
}

export const Route = createFileRoute(
  '/_layout/entrance/_public/signup/_layout/8',
)({
  component: GetLocationPage,
  validateSearch: (search: Record<string, unknown>): SearchParamFromPhase7 => {
    return {
      nickname: search.nickname ? (search.nickname as Nickname) : undefined,
      username: search.username ? (search.username as Username) : undefined,
      password: search.password ? (search.password as Password) : undefined,
      birth: search.birth ? (search.birth as Birth) : undefined,
      gender: search.gender ? (search.gender as Gender) : undefined,
      phoneNumber: search.phoneNumber
        ? (search.phoneNumber as Phone)
        : undefined,
      email: search.email ? (search.email as Email) : undefined,
    };
  },
  beforeLoad: async ({search}) => {
    if (!search.phoneNumber)
      throw redirect({to: '/entrance/signup/6', search: {...search}});
  },
});

function GetLocationPage() {
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate({from: '/entrance/signup/8'});
  const {nickname, gender, password, username, birth, phoneNumber, email} =
    Route.useSearch();
  const {mutate} = useMutation({
    mutationFn: barter.signup,
    onSuccess: () =>
      navigate({to: '/entrance/signup/9', search: {success: true}}),
    onError: () => console.error('회원가입하는데 문제가 발생했습니다.'),
  });

  async function handleSignup() {
    if (isMutating) return;
    setIsMutating(true);
    const {
      coords: {latitude, longitude},
    } = await getPosition();
    mutate({
      gender: gender!,
      password: password!,
      username: username!,
      birth: birth!,
      phone: phoneNumber!,
      email: email!,
      nickname: nickname!,
      latitude,
      longitude,
    });
    setIsMutating(false);
  }

  if (isMutating) return <Spinner />;

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            농부님의
            <br />
            위치를 등록해주세요
          </Heading>
        </div>
      </div>
      <div className={cx('inputContainer')} />
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick={handleSignup}
        >
          위치 등록하기
        </GeneralButton>
      </div>
    </div>
  );
}