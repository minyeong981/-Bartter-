import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

import Heart from '../Heart';
import styles from './HomeTradeCardList.module.scss';

const cx = classnames.bind(styles);

export default function HomeTradeCard({
  cropTradePostId,
  title,
  image,
  likeCount,
  createdAt,
  isLike,
}: SimpleTradePostDetail) {

  return (
    <div className={cx('barter-card')}>
      <Link
      to="/trade/detail/$tradePostId"
      params={{tradePostId: String(cropTradePostId)}}>
      <img
        className={cx('barter-image')}
        src={image}
        alt={title}
      />
      </Link>
      <div className={cx('barter-title')}>{title}</div>
      <div className={cx('barter-time')}>
        {format(createdAt, 'yyyy-MM-dd', {locale: ko})}
      </div>
      <div className={cx('barter-likes')}>
        <Heart count={likeCount} isLike={isLike} />
      </div>
    </div>
  );
}