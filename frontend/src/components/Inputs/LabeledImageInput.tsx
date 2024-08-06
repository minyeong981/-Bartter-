import classnames from 'classnames/bind';

import type {ImageInputProps} from '@/components/Inputs/ImageInput.tsx';
import ImageInput from '@/components/Inputs/ImageInput.tsx';

import styles from './input.module.scss';

type LabeledImageInputProps = ImageInputProps & {label: string};

const cx = classnames.bind(styles);

export default function LabeledImageInput({
  onImageChange,
  maxImages,
  label,
}: LabeledImageInputProps) {
  return (
    <label className={cx('labeledImageInput')}>
      {label}
      <ImageInput onImageChange={onImageChange} maxImages={maxImages} />
    </label>
  );
}