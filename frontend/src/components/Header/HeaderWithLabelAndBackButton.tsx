import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconBack} from '../../assets/svg';
import styles from './header.module.scss';
import HeaderContainer from './HeaderContainer.tsx';

const cx = classnames.bind(styles);

interface HeaderWithLabelAndBackButtonProps {
  label: ReactNode;
}

export default function HeaderWithLabelAndBackButton({
  label,
}: PropsWithChildren<HeaderWithLabelAndBackButtonProps>) {
  return (
    <HeaderContainer>
      <div className={cx('left-buttons')}>
        <Link>
          <IconBack className={cx('back-button')} />
        </Link>
      </div>
      <span className={cx('center', 'label')}>{label}</span>
    </HeaderContainer>
  );
}