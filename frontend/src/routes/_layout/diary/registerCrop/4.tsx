import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent} from 'react';

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
  const image = useRegisterCropStore(state => state.image) || '';
  const setImage = useRegisterCropStore(state => state.setImage);
  // const isValid = image.match(EMAIL_PATTERN);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.currentTarget.value);
  };


  return (
    <div className={cx('registerPage')}>
      <div className={cx('headingContainer')}>
        <Heading>
          {nickname}의
          <br />
          사진을 등록해주세요.
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <ImageInput />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/diary/registerCrop/5"
          // disabled={!isValid}
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}

export default GetImagePage;
