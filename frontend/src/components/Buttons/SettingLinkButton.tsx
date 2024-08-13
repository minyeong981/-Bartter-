import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {PropsWithChildren} from "react";

import {IconBack} from '@/assets/svg';

import styles from './SettingLinkButton.module.scss';

const cx = classnames.bind(styles);


export default function SettingLinkButton({  to, children,...props }: PropsWithChildren<LinkProps> ) {
  return (
    <Link className={cx('button')} to={to} {...props}>
      <div>{children}</div>
      <div className={cx('backButton')}><IconBack /></div>
    </Link>
  );
}