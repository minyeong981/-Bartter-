import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import Heading from '@/components/Heading';
import barter from '@/services/barter.ts';
import useStore from '@/store';
import format from '@/util/format.ts';
import {getPosition} from '@/util/geolocation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/8')({
  component: GetLocationPage,
});

function GetLocationPage() {
  const navigate = useNavigate({from: '/signup/1'});
  const resetSignupForm = useStore(state => state.resetSignupForm);
  const {nickname, username, password, gender, phone, birth, email} = useStore(
    state => state,
  );

  async function handleSignup() {
    try {
      const {
        coords: {latitude, longitude},
      } = await getPosition();
      await barter.signup({
        gender: gender!,
        birth: format.birth(birth),
        latitude: latitude,
        longitude: longitude,
        email,
        nickname,
        username,
        password,
        phone,
      });
      resetSignupForm();
      navigate({to: '/signup/9'});
      return;
    } catch (e) {
      console.error(e);
      alert('회원가입을 하는데 실패했습니다.');
    }
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br />
          위치를 등록해주세요
        </Heading>
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
    </>
  );
}