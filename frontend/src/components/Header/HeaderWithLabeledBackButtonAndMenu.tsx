import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconBell, IconSearch, IconUser} from '../../assets/svg';
import BackButton from './BackButton/BackButton.tsx';
import Index from './Container';
import styles from './header.module.scss';

interface LabeledBackButtonHeaderProps {
  label: ReactNode;
}

const cx = classnames.bind(styles);

export default function HeaderWithLabeledBackButtonAndMenu({
  label,
}: PropsWithChildren<LabeledBackButtonHeaderProps>) {
  return (
    <Index>
      <div className={cx('left-buttons')}>
        <BackButton />
        <span className={cx('label')}>{label}</span>
      </div>
      <ul className={cx('buttons')}>
        <Link>
          <IconUser className={cx('icon')} />
        </Link>
        <Link>
          <IconSearch className={cx('icon')} />
        </Link>
        <Link>
          <IconBell className={cx('icon')} />
        </Link>
      </ul>
    </Index>
  );
}