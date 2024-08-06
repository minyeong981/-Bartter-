import classnames from 'classnames/bind';
import type {InputHTMLAttributes} from 'react';

import styles from './input.module.scss';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const cx = classnames.bind(styles);

export default function CheckboxInput({label, ...props}: CheckboxInputProps) {
  const id = `${props.value} checkbox`;
  return (
    <div className={cx('checkbox')}>
      {label && <span>{label}</span>}
      <input type="checkbox" id={id} {...props} />
      <label htmlFor={id} />
    </div>
  );
}