import {useMutation} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import barter from '@/services/barter.ts';
import {getPosition} from '@/util/geolocation.ts';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/entrance/_public/signup/_layout/additional',
)({
  component: AdditionalInfoPage,
});

function AdditionalInfoPage() {
  const [isMutating, setIsMutating] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const {mutate} = useMutation({
    mutationFn: barter.additionalInfo,
    onSuccess: () => setIsSignupSuccess(true),
  });

  async function handleSubmitLocation() {
    if (isMutating) return;
    setIsMutating(true);
    const {coords} = await getPosition();
    const {longitude, latitude} = coords;
    mutate({latitude, longitude});
    setIsMutating(false);
  }

  if (isMutating) return <Spinner />;

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
          onClick={handleSubmitLocation}
          disabled={isSignupSuccess}
        >
          위치 등록하기
        </GeneralButton>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/entrance/Oauth"
          disabled={!isSignupSuccess}
        >
          회원가입 완료
        </LinkButton>
      </div>
    </>
  );
}