import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBack} from '@/assets/svg';

import styles from './SettingLinkButton.module.scss';

const cx = classnames.bind(styles);


export default function SettingLinkButton({ text, to, ...props }: LinkProps & {text:string, to: string }) {
  return (
    <Link className={cx('button')} to={to} {...props}>
      <div>{text}</div>
      <div className={cx('backButton')}><IconBack /></div>
    </Link>
  );
}
