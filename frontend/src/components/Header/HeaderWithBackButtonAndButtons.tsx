import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBell, IconSearch, IconUser} from '../../assets/svg';
import BackButton from './BackButton/BackButton.tsx';
import Index from './Container';
import styles from './header.module.scss';

const cx = classnames.bind(styles);

export default function HeaderWithBackButtonAndButtons() {
  return (
    <Index>
      <BackButton />
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