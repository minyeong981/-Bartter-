import {useRouter} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBack} from '@/assets/svg';

import styles from './backButton.module.scss';

const cx = classnames.bind(styles);

export default function BackButton() {
  const {history} = useRouter();

  const handleBackButton = () => {
    if (window.history.length > 1) {
      history.back();
    } else {
      location.href = '/';
    }
  };
  return (
    <button className={cx('back-button')}>
      <IconBack onClick={handleBackButton} />
    </button>
  );
}