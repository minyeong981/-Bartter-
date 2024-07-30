import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent} from 'react';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import LabeledInput from '@/components/Inputs/LabeledInput';
import useRegisterCropStore from '@/store/registerCropStore';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/4')({
  component: GetImagePage,
});

function GetImagePage() {
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
          작물별명의
          <br />
          사진을 등록해주세요.
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <LabeledInput
          label="작물 사진 (선택 사항)"
          placeholder=""
          onChange={handleImageChange}
          value={image}
        />
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
