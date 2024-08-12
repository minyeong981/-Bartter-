import classnames from 'classnames/bind';
import type {ButtonHTMLAttributes, PropsWithChildren} from 'react';

import styles from './SettingButton.module.scss';

const cx = classnames.bind(styles);

export default function SettingButton({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className={cx('button')} {...props}>
      {children}
    </button>
  );
}