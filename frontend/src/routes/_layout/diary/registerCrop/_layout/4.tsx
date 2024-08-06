import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import ImageInput from '@/components/Inputs/ImageInput';
import useRootStore from '@/store';

import styles from '../registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/_layout/4')({
  component: GetImagePage,
});

function GetImagePage() {
  const { nickname, image, initialImage, setImage } = useRootStore(state => (state));
  const maxImages = 1; // 허용된 최대 이미지 개수
  const [images, setImages] = useState<string[]>(image ? [image] : []);

  useEffect(() => {
    console.log('storedImages:', images);
    if (!image && initialImage) {
      setImages([initialImage]);
      setImage(initialImage);
    }
  }, [image, images, initialImage, setImage]);

  const handleImageChange = (newImages: string[]) => {
    setImages([...newImages]);
    setImage(newImages.length > 0 ? newImages[newImages.length - 1] : initialImage);
    console.log('newImages:', newImages);
    console.log('setImage:', newImages.length > 0 ? newImages[newImages.length - 1] : initialImage);
  };

  return (
    <>
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
    </>
  );
}

export default GetImagePage;
