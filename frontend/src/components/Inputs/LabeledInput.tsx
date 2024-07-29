import classnames from 'classnames/bind';

import type {GeneralInputProps} from '@/components/Inputs/GeneralInput.tsx';
import GeneralInput from '@/components/Inputs/GeneralInput.tsx';

import styles from './input.module.scss';

type LabeledInputProps = GeneralInputProps & {label: string};

const cx = classnames.bind(styles);

export default function LabeledInput({label, ...props}: LabeledInputProps) {
  return (
    <label className={cx('labeledInput')}>
      {label}
      <GeneralInput {...props} />
    </label>
  );
}