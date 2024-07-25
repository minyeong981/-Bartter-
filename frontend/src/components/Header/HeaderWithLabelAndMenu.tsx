import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconBell, IconSearch, IconUser} from '../../assets/svg';
import styles from './container.module.scss';
import HeaderContainer from './HeaderContainer.tsx';

interface LabeledHeaderProps {
  label: ReactNode;
}

const cx = classnames.bind(styles);

export default function HeaderWithLabelAndMenu({
  label,
}: PropsWithChildren<LabeledHeaderProps>) {
  return (
    <HeaderContainer>
      <span className={cx('label')}>{label}</span>
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