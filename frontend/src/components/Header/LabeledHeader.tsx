import {Link} from '@tanstack/react-router';
import type {PropsWithChildren, ReactNode} from 'react';

import {IconBack, IconBell, IconSearch, IconUser} from '../../assets/svg';

interface LabeledHeaderProps {
  label: ReactNode;
}

export default function LabeledHeader({
  label,
}: PropsWithChildren<LabeledHeaderProps>) {
  return (
    <nav className={cx('header')}>
      <Link>
        <IconBack className={cx('backButton')} />
      </Link>
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
    </nav>
  );
}