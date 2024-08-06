import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import Heart from '@/components/Heart';
import Status from '@/components/Status';

import styles from './tradeCard.module.scss';

type TradeCardProps = SimpleCropTradePost & LinkProps;

const cx = classnames.bind(styles);

export default function TradeCard({
  cropTradePostId,
  title,
  imageURL,
  status,
  location,
  likeCount,
  createdAt,
  isLike,
  isShare,
  ...props
}: TradeCardProps) {
  return (
    <Link className={cx('tradeCard')} {...props}>
      <img src={imageURL} alt="이미지" />
      <div className={cx('tradeCardContent')}>
        <h3 className={cx('title')}>{title}</h3>
        <p className={cx('location')}>{location.locationName}</p>
        <p className={cx('date')}>{createdAt}</p>
        <p className={cx('share')}>{isShare && '나눔'}</p>
        <Status status={status} className={styles['topRight']} />
        <Heart
          count={likeCount}
          isLike={isLike}
          className={styles['bottomRight']}
        />
      </div>
    </Link>
  );
}