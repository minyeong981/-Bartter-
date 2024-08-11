import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './SettingButton.module.scss';

const cx = classnames.bind(styles);


export default function SettingLinkButton({ children, to, ...props }: LinkProps & { to: string }) {
  return (
    <Link className={cx('button')} to={to} {...props}>
      {children}
    </Link>
  );
}
