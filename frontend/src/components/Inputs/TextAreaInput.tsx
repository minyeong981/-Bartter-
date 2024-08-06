import classnames from 'classnames/bind';
import type {TextareaHTMLAttributes} from 'react';

import styles from './input.module.scss';

export type GeneralInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const cx = classnames.bind(styles);

export default function TextAreaInput(props: GeneralInputProps) {
  return <textarea {...props} className={cx('textAreaInput')} />;
}