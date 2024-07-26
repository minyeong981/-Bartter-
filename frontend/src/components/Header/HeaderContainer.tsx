import classnames from 'classnames/bind';
import type {PropsWithChildren} from 'react';

import styles from './header.module.scss';

const cx = classnames.bind(styles);

export default function HeaderContainer({children}: PropsWithChildren) {
  return <nav className={cx('header')}>{children}</nav>;
}