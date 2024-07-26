import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconMenu} from '../../assets/svg';
import BackButton from './BackButton/BackButton.tsx';
import Index from './Container';
import styles from './header.module.scss';

const cx = classnames.bind(styles);

interface HeaderWithLabelAndBackButtonAndMenuProps {
  label: ReactNode;
}

export default function HeaderWithLabelAndBackButtonAndMenu({
  label,
}: PropsWithChildren<HeaderWithLabelAndBackButtonAndMenuProps>) {
  return (
    <Index>
      <div className={cx('left-buttons')}>
        <BackButton />
      </div>
      <span className={cx('center', 'label')}>{label}</span>
      <button>
        <IconMenu className={cx('icon')} />
      </button>
    </Index>
  );
}