import { useMutation } from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useState} from 'react'

import GeneralButton from '@/components/Buttons/GeneralButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput';
import barter from '@/services/barter';

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
  const {crop, nickname, growDate} = Route.useSearch()
  const [description, setDescription] = useState('');
  const isValid = description.length <= 100;

  const navigate = useNavigate()
    const mutation = useMutation({
    mutationFn: barter.postCropProfile,
    onSuccess: (data) =>{
      console.log(data.data.isSuccess);
      const cropId = data.data.data.cropId
      if(data.data.isSuccess && cropId){
        console.log("성공 ", data.data.data.cropId)
        navigate({to: '/diary/registerCrop/5', search:{cropId}} )
      }else{
        console.error('농작물 등록하는데 문제가 발생했습니다.')
      }
    },
    onError: () => console.error('농작물 등록하는데 문제가 발생했습니다.'),
  });

  async function handleContinueButton() {
    mutation.mutate({
      cropCategoryId: crop.cropCategoryId,
      nickname: nickname,
      growDate: growDate,
      description: description && description,
      // image: image.length > 0 ? image : undefined
    });
    return;
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };



  

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
            onChange={
              handleDescriptionChange as unknown as (
                e: ChangeEvent<HTMLTextAreaElement>,
              ) => void
            }
            value={description}
          />
        </div>
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
    </div>
  );
}

export default GetDesciptionPage;