
import { Link } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './SettingButton.module.scss';

interface SettingButtonProps {
    children: React.ReactNode;
    to: string;
}

const cx = classnames.bind(styles);

export default function SettingButton({ children, to}: SettingButtonProps ) {
  return (
    <Link
      className={cx('button')}
      to={to}
    >
      {children}
    </Link>
  );
}
