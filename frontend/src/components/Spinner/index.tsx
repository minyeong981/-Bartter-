import classnames from 'classnames/bind';
import Lottie from 'react-lottie-player';

import spinnerAnimation from '@/assets/lottie/spinner.json';

import styles from './spinner.module.scss';

const cx = classnames.bind(styles);

export default function Spinner() {
  return (
    <Lottie
      loop
      animationData={spinnerAnimation}
      play
      className={cx('spinner')}
    />
  );
}