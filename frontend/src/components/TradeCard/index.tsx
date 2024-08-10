import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

import Heart from '@/components/Heart';
import Status from '@/components/Status';

import styles from './tradeCard.module.scss';

type TradeCardProps = SimpleTradePostDetail & LinkProps;

const cx = classnames.bind(styles);

export default function TradeCard({
  cropTradePostId,
  title,
  image,
  status,
  location,
  likeCount,
  createdAt,
  isLike,
  isShare,
  ...props
}: TradeCardProps) {
  return (
    <Link
      className={cx('tradeCard')}
      {...props}
      to="/trade/detail/$tradePostId"
      params={{tradePostId: String(cropTradePostId)}}
    >
      <img src={image} alt="이미지" />
      <div className={cx('tradeCardContent')}>
        <h3 className={cx('title')}>{title}</h3>
        <p className={cx('location')}>{location.name}</p>
        <p className={cx('date')}>
          {format(createdAt, 'yyyy-MM-dd', {locale: ko})}
        </p>
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