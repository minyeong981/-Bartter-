import classNames from 'classnames';
import type {HTMLAttributes, PropsWithChildren, ReactNode} from 'react';

import BackButton from './BackButton/BackButton.tsx';
import Container from './Container/index.tsx';
import styles from './header.module.scss';

const cx = classNames;

interface HeaderWithLabelAndBackButtonProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
}

export default function HeaderWithLabelAndBackButton({
  className,label,...props
}: PropsWithChildren<HeaderWithLabelAndBackButtonProps>) {
  return (
    <Container {...props} className={className}>
      <div className={cx(styles['left-buttons'])}>
        <BackButton />
      </div>
      <span className={cx(styles['center'], styles['label'])}>{label}</span>
    </Container>
  );
}