import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput';
import useRegisterCropStore from '@/store/registerCropStore';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/2')({
  component: GetDatePage,
});

function GetDatePage() {
  const navigate = useNavigate({from: '/diary/registerCrop/2'});
  const date = useRegisterCropStore(state => state.date) || '';
  const setDate = useRegisterCropStore(state => state.setDate);
  // const isValid = description.length <= 100;

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  function handleContinueButton() {
    setDate(undefined);
    navigate({to: '/diary/registerCrop/5'});
  }

  return (
    <div className={cx('registerPage')}>
      <div className={cx('headingContainer')}>
        <Heading>
          내 작물 별명 과/와
          <br />
          처음 만난 날짜를 입력해주세요.
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="처음 만난 날짜"
          placeholder="현재 날짜"
          onChange={handleDateChange}
          value={date}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/diary/registerCrop/3"
          // disabled={!isValid}
        >
          다음
        </LinkButton>
        <GeneralButton
          buttonStyle={{style: 'outlined', size: 'large'}}
          onClick={handleContinueButton}
        >
          건너뛰기
        </GeneralButton>
      </div>
    </div>
  );
}

export default GetDatePage;
