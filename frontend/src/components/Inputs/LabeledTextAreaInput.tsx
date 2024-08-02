import classnames from 'classnames/bind';
import type {TextareaHTMLAttributes} from 'react';

import styles from './input.module.scss';
import TextAreaInput from './TextAreaInput';

type LabeledInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

const cx = classnames.bind(styles);

export default function LabeledTextAreaInput({
  label,
  ...props
}: LabeledInputProps) {
  return (
    <label className={cx('labeledInput')}>
      {label}
      <TextAreaInput {...props} />
    </label>
  );
}