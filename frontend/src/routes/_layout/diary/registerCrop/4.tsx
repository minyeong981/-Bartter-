import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import ImageInput from '@/components/Inputs/ImageInput';
import useRegisterCropStore from '@/store/registerCropStore';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/4')({
  component: GetImagePage,
});

function GetImagePage() {
  const nickname = useRegisterCropStore(state => state.nickname);
  const storedImages = useRegisterCropStore(state => state.image ? [state.image] : []);
  const setImage = useRegisterCropStore(state => state.setImage);
  const maxImages = 1; // 허용된 최대 이미지 개수
  const [images, setImages] = useState<string[]>(storedImages);

  const handleImageChange = (newImages: string[]) => {
    setImages(newImages);
    setImage(newImages.length > 0 ? newImages[newImages.length - 1] : '');
  };

  return (
    <div className={cx('registerPage')}>
      <div className={cx('headingContainer')}>
        <Heading>
          {nickname}의
          <br />
          사진을 등록해주세요.
        </Heading>
        <br />
        <p>사진 ({images.length}/{maxImages})</p>
      </div>
      <div className={cx('inputContainer')}>
        <ImageInput onImageChange={handleImageChange} maxImages={maxImages} />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary/registerCrop/5"
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}

export default GetImagePage;
