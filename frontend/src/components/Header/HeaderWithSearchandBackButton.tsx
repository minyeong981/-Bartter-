import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import BackButton from './BackButton/BackButton.tsx';
import Index from './Container';
import styles from './header.module.scss';

const cx = classnames.bind(styles);

interface HeaderWithLabelAndBackButtonAndMenuProps {
  label: ReactNode;
}

export default function HeaderWithSearchAndBackButton({
  label,
}: PropsWithChildren<HeaderWithLabelAndBackButtonAndMenuProps>) {
  return (
    <Index>
      <div className={cx('left-buttons')}>
        <BackButton />
      </div>
      <div className={cx('center-search', 'label', 'search')}>{label}</div>
    </Index>
  );
}