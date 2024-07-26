import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconBack, IconBell, IconSearch, IconUser} from '../../assets/svg';
import styles from './header.module.scss';
import HeaderContainer from './HeaderContainer.tsx';

interface LabeledBackButtonHeaderProps {
  label: ReactNode;
}

const cx = classnames.bind(styles);

export default function HeaderWithLabeledBackButtonAndMenu({
  label,
}: PropsWithChildren<LabeledBackButtonHeaderProps>) {
  return (
    <HeaderContainer>
      <div className={cx('left-buttons')}>
        <Link>
          <IconBack className={cx('back-button')} />
        </Link>
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
    </HeaderContainer>
  );
}