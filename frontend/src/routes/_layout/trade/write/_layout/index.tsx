import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {ImageLettuce} from '@/assets/image';
import SelectCropButton from '@/components/Buttons/SelectCropButton';
import CropImage from '@/components/CropImage';
import CheckboxInput from '@/components/Inputs/CheckboxInput.tsx';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput.tsx';

import styles from './write.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/trade/write/_layout/')({
  component: WritePage,
});

function WritePage() {
  return (
    <div className={cx('writePage')}>
      <CropImage imgSrc={ImageLettuce} label="상추" />
      <LabeledInput label="제목" placeholder="제목을 입력하세요" />
      <CheckboxInput label="나눔인가요?" />
      <SelectCropButton selectedCrops={['상추', '고추', '바나나', '상추']} />
      <LabeledTextAreaInput label="내용" placeholder="내용을 입력하세요" />
    </div>
  );
}