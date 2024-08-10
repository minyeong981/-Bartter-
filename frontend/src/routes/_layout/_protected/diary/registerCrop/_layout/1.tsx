import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent } from 'react';
import { useState} from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import type { SearchParamCrop } from '@/components/Crop/CropModal';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput';

import styles from '../registerCrop.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamNickName extends SearchParamCrop {
  nickname: string
}

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/_layout/1')({
  component: GetNicknamePage,
});

function GetNicknamePage() {
  const [nickname, setNickname] = useState('');
  const isValid = nickname.length >= 1 && nickname.length <= 30;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            내 작물의
            <br />
            별명을 지어주세요
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
      </div>
      
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary/registerCrop/2"
          disabled={!isValid}
          search={(prev)=>({...prev, nickname})}
        >
          다음
        </LinkButton>
      </div>
      </div>
  );
}

export default GetNicknamePage;