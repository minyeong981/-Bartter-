import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput';
import useRootStore from '@/store';

import styles from '../registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/_layout/1')({
  component: GetNicknamePage,
});

function GetNicknamePage() {
  const { nickname, setNickname} = useRootStore(state => ({
    nickname: state.nickname,
    setNickname: state.setNickname,
    resetCropForm: state.resetCropForm,
  }));
  const isValid = nickname.length >= 1 && nickname.length <= 30;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          내 작물의
          <br />
          별명을 지어주세요.
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="작물 별명"
          placeholder="별명을 입력해주세요"
          onChange={handleNameChange}
          value={nickname}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary/registerCrop/2"
          disabled={!isValid}
        >
          다음
        </LinkButton>
      </div>
    </>
  );
}

export default GetNicknamePage;