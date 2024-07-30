import classnames from 'classnames/bind';
import type {InputHTMLAttributes} from 'react';

import styles from './input.module.scss';

export type GeneralInputProps = InputHTMLAttributes<HTMLInputElement>;

const cx = classnames.bind(styles);

export default function TextAreaInput(props: GeneralInputProps) {
  return <input type="textarea" {...props} className={cx('textAreaInput')} />;
}