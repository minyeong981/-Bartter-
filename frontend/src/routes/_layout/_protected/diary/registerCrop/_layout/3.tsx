import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput';

import styles from '../registerCrop.module.scss';
import type { SearchParamDate } from './2';

const cx = classnames.bind(styles);

export interface SearchParamDescription extends SearchParamDate {
  description?: string;
}

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/_layout/3')({
  component: GetDesciptionPage,
  validateSearch: ({ crop, nickname, growDate }): SearchParamDate => {
    return {
      crop: crop as CropCategoryDetail,
      nickname: nickname as string,
      growDate: growDate as string,
    };
  },
});

function GetDesciptionPage() {
  const { nickname } = Route.useSearch();
  const [description, setDescription] = useState('');
  const [isAbled, setAbled] = useState({ next: false, skip: true });

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setDescription(value);

    if (value.length > 0) {
      setAbled({ next: true, skip: false });
    } else {
      setAbled({ next: false, skip: true });
    }
  };

  const navigate = useNavigate();

  async function handleContinueButton() {
    await navigate({ to: '/diary/registerCrop/4', 
      search: (prev) => ({ 
        ...prev,
        description: prev.description || "", 
        growDate: prev.growDate || "", 
        nickname: prev.nickname || "", 
        crop: prev.crop as CropCategoryDetail,  }) });
  }

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            {nickname}을/를
            <br />
            소개해주세요.
          </Heading>
        </div>
        <div className={cx('inputContainer')}>
          <LabeledTextAreaInput
            label="작물 설명 (선택 사항)"
            placeholder="품종 등"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>
      </div>

      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/diary/registerCrop/4"
          disabled={!isAbled.next}
          search={(prev) => ({ ...prev, description })}
        >
          다음
        </LinkButton>
        <GeneralButton
          buttonStyle={{style: 'outlined', size: 'large'}}
          onClick={handleContinueButton}
          disabled={!isAbled.skip}
        >
          건너뛰기
        </GeneralButton>
      </div>
    </div>
  );
}

export default GetDesciptionPage;
