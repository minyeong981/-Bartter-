import classnames from 'classnames/bind';
import type {ButtonHTMLAttributes} from 'react';

import styles from './selectCrop.module.scss';

export type SelectedCropButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    selectedCrops: string[];
  };

const cx = classnames.bind(styles);

export default function SelectCropButton({
  selectedCrops,
  ...props
}: SelectedCropButtonProps) {
  const text =
    selectedCrops.length === 0
      ? '작물 선택'
      : selectedCrops.length > 3
        ? selectedCrops.slice(0, 3).join(', ').concat(', ...')
        : selectedCrops.join(', ');

  return (
    <button className={cx('selectCropButton')} {...props}>
      {text}
    </button>
  );
}