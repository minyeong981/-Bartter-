import classnames from 'classnames/bind';

import BackButton from './BackButton/BackButton.tsx';
import Index from './Container';
import styles from './header.module.scss';

const cx = classnames.bind(styles);

export default function HeaderWithBackButton() {
  return (
    <Index>
      <div className={cx('left-buttons')}>
        <BackButton />
      </div>
    </Index>
  );
}