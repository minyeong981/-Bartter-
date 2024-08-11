import {useMutation} from '@tanstack/react-query';
import { createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import Heading from '@/components/Heading';
import ImageInput from '@/components/Inputs/ImageInput';
import barter from '@/services/barter.ts';

import styles from '../registerCrop.module.scss';
import type { SearchParamDescription } from './3';


const cx = classnames.bind(styles);


export interface SearchParamImage extends SearchParamDescription {
  image?: File[];
}

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/_layout/4')({
  component: GetImagePage,
  validateSearch: ({crop, nickname, growDate, description}) : SearchParamDescription => {
    return {
      crop: crop as CropCategoryDetail,
      nickname: nickname as string,
      growDate: growDate as string,
      description: description !== '' ? (description as string) : ''
    }
  }
});

function GetImagePage() {
  const { crop, nickname, growDate, description } = Route.useSearch();
  const maxImages = 1; // 허용된 최대 이미지 개수
  const [image, setImage] = useState<File[]>([]);
  const navigate = useNavigate();
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

  async function handleRegister() {
    mutation.mutate({
      cropCategoryId: crop.cropCategoryId,
      nickname: nickname,
      growDate: growDate,
      description: description && description,
      image: image.length > 0 ? image : undefined
    });
    return;
  }

  const handleImageChange = (newImage: File[]) => {
    setImage(newImage);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('headingContainer')}>
          <Heading>
            {nickname}의
            <br />
            사진을 등록해주세요
          </Heading>
          <br />
        </div>
      <div className={cx('inputContainer')}>
        <p>사진 ({image.length}/{maxImages})</p>
        <ImageInput onImageChange={handleImageChange} maxImages={maxImages} />
      </div>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick={handleRegister}
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}

export default GetImagePage;
