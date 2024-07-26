import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBack, IconBell, IconSearch, IconUser} from '../../assets/svg';
import styles from './header.module.scss';
import HeaderContainer from './HeaderContainer.tsx';

const cx = classnames.bind(styles);

export default function HeaderWithBackButtonAndMenu() {
  return (
    <HeaderContainer>
      <Link>
        <IconBack className={cx('back-button')} />
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
    </HeaderContainer>
  );
}