import classnames from 'classnames/bind';
import type {PropsWithChildren, ReactNode} from 'react';

import BackButton from './BackButton/BackButton.tsx';
import Index from './Container';
import styles from './header.module.scss';

const cx = classnames.bind(styles);

interface HeaderWithLabelAndBackButtonProps {
  label: ReactNode;
}

export default function HeaderWithLabelAndBackButton({
  label,
}: PropsWithChildren<HeaderWithLabelAndBackButtonProps>) {
  return (
    <Index>
      <div className={cx('left-buttons')}>
        <BackButton />
      </div>
      <span className={cx('center', 'label')}>{label}</span>
    </Index>
  );
}