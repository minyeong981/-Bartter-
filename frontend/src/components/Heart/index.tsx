import classNames from 'classnames';
import type {HTMLAttributes} from 'react';

import {IconHeart} from '@/assets/svg';

import styles from './heart.module.scss';

interface HeartProps extends HTMLAttributes<HTMLDivElement> {
  count: LikeCount;
  isLike: IsLike;
}

const cx = classNames;

export default function Heart({
  count,
  isLike,
  className,
  ...props
}: HeartProps) {
  return (
    <div {...props} className={cx(styles.heart, className)}>
      <IconHeart className={cx(styles.icon, {[styles.liked]: isLike})} />
      {!!count && count}
    </div>
  );
}