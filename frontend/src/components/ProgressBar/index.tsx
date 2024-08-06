import classnames from 'classnames/bind';
import type {CSSProperties} from 'react';

import styles from './progressBar.module.scss';

interface ProgressBarProps {
  total: number;
  current: number;
}

const cx = classnames.bind(styles);

export default function ProgressBar({current, total}: ProgressBarProps) {
  return (
    <div
      className={cx('progress-bar')}
      style={
        {'--progress-width': `${(current / total) * 100}%`} as CSSProperties
      }
    />
  );
}