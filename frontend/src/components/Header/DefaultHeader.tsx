import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBack, IconBell, IconSearch, IconUser} from '../../assets/svg';
import styles from './defaultHeader.module.scss';

const cx = classnames.bind(styles);

export default function DefaultHeader() {
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