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

export const Route = createFileRoute('/_layout/diary/registerCrop/3')({
  component: GetDesciptionPage,
});

function GetDesciptionPage() {
  const navigate = useNavigate({from: '/diary/registerCrop/2'});
  const description = useRegisterCropStore(state => state.description) || '';
  const setDescription = useRegisterCropStore(state => state.setDescription);
  const isValid = description.length <= 100;

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  function handleContinueButton() {
    setDescription(undefined);
    navigate({to: '/diary/registerCrop/5'});
  }

  return (
    <div className={cx('registerPage')}>
      <div className={cx('headingContainer')}>
        <Heading>
          내 작물을/를
          <br />
          소개해주세요.
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="작물 설명 (선택 사항)"
          placeholder="품종 등"
          onChange={handleDescriptionChange}
          value={description}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/diary/registerCrop/4"
          disabled={!isValid}
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

export default GetDesciptionPage;
