import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBack} from '../../assets/svg';
import styles from './header.module.scss';
import HeaderContainer from './HeaderContainer.tsx';

const cx = classnames.bind(styles);

export default function HeaderWithBackButton() {
  return (
    <HeaderContainer>
      <div className={cx('leftButtons')}>
        <Link>
          <IconBack className={cx('backButton')} />
        </Link>
      </div>
    </HeaderContainer>
  );
}