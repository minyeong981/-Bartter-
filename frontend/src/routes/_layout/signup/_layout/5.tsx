import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import BinaryButton from '@/components/BinaryButton';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import useStore from '@/store';

import styles from '../signup.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/signup/_layout/5')({
  component: GetGenderPage,
});

function GetGenderPage() {
  const gender = useStore(state => state.gender);
  const setGender = useStore(state => state.setGender);

  function handleSelectGender(gender: string) {
    setGender(gender as Gender);
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          농부님의
          <br />
          성별을 알려주세요
        </Heading>
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
        >
          다음
        </GeneralButton>
      </div>
    </>
  );
}