import {useRouter} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {IconBack} from '@/assets/svg';

import styles from './backButton.module.scss';

const cx = classnames.bind(styles);

export default function BackButton() {
  const {history} = useRouter();

  const handleBackButton = () => {
    console.log(window.history.length);
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
