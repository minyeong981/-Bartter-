import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconSearch, IconUser} from '@/assets/svg';

import Index from './Container';
import styles from './header.module.scss';

interface HeaderWithLabelAndButtonsProps {
  label: ReactNode;
}

const cx = classnames.bind(styles);

export default function HeaderWithLabelAndButtons({
  label,
}: PropsWithChildren<HeaderWithLabelAndButtonsProps>) {
  return (
    <Index>
      <span className={cx('label')}>{label}</span>
      <ul className={cx('buttons')}>
        <Link 
        to='/search'
         >
          <IconSearch className={cx('icon')} />
        </Link>
        <Link to="/profile">
          <IconUser className={cx('icon')} />
        </Link>
      </ul>
    </Index>
  );
}