import classnames from 'classnames/bind';

import type {SelectedCropButtonProps} from '@/components/Buttons/SelectCropButton/index.tsx';
import SelectCropButton from '@/components/Buttons/SelectCropButton/index.tsx';

import styles from './selectCrop.module.scss';

type LabeledSelectCropButtonProps = SelectedCropButtonProps & {label: string};

const cx = classnames.bind(styles);

export default function LabeledSelectCropButton({
  label,
  ...props
}: LabeledSelectCropButtonProps) {
  return (
    <label className={cx('labeledSelectCropButton')}>
      {label}
      <SelectCropButton {...props} />
    </label>
  );
}