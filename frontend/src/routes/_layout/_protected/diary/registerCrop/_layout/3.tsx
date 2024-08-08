import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react'

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
  validateSearch: ({crop, nickname, growDate}) : SearchParamDate => {
    return {
      crop: crop as CropCategoryDetail,
      nickname: nickname as string,
      growDate: growDate as string
    }
  }
});

function GetDesciptionPage() {
  const {nickname} = Route.useSearch()
  const [description, setDescription] = useState('');
  const isValid = description.length <= 100;

  const navigate = useNavigate()
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  function handleContinueButton() {
    setDescription('');
    navigate({to: '/diary/registerCrop/5'});
  }

  return (
    <>
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
          onChange={
            handleDescriptionChange as unknown as (
              e: ChangeEvent<HTMLTextAreaElement>,
            ) => void
          }
          value={description}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/diary/registerCrop/4"
          disabled={!isValid}
          search={(prev) => ({...prev, description})}
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
    </>
  );
}

export default GetDesciptionPage;