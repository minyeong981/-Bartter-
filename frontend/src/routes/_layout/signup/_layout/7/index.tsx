import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import Heading from '@/components/Heading';
import useSignupStore from '@/store/signupStore.ts';
import {getPosition} from '@/util/geolocation.ts';

import styles from '../../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/7/')({
  component: GetLocationPage,
});

function GetLocationPage() {
  const navigate = useNavigate({from: '/signup/7'});
  const setCoordinate = useSignupStore(state => state.setCoordinate);

  async function handleCooridnate() {
    try {
      const {coords} = await getPosition();
      setCoordinate(coords);
      navigate({to: '/signup/8'});
      return;
    } catch (e) {
      console.error(e);
      alert('위치 정보를 가져오는데 실패했습니다.');
    }
  }

  return (
    <div className={cx('signup')}>
      <HeaderWithBackButton />
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
          onClick={handleCooridnate}
        >
          위치 등록하기
        </GeneralButton>
      </div>
    </div>
  );
}