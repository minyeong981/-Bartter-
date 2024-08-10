import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import useRootStore from '@/store';

import styles from './chatInfoCard.module.scss';

const cx = classnames.bind(styles);

type ChatInfoCardProps = TradeInfo & {
  onClick: (status: Status) => void;
};

export default function ChatInfoCard({
  simpleTradePostDetail,
  userProfile,
  onClick,
}: ChatInfoCardProps) {
  const userId = useRootStore(state => state.userId);
  const disabled =
    simpleTradePostDetail.status === 'COMPLETED' ||
    userProfile.userId !== userId;

  const STATUS = {
    PROGRESS: '거래가능',
    RESERVED: '예약중',
    COMPLETED: '거래완료',
  }[simpleTradePostDetail.status];

  const ButtonText = {
    PROGRESS: '예약하기',
    RESERVED: '예약중',
    COMPLETED: '거래완료',
  }[simpleTradePostDetail.status];

  function handleClickButton() {
    onClick(simpleTradePostDetail.status);
  }

  return (
    <div className={cx('chatInfoCard')}>
      <Link
        to="/trade/detail/$tradePostId"
        params={{tradePostId: String(simpleTradePostDetail.cropTradePostId)}}
        className={cx('content')}
      >
        <img
          src={simpleTradePostDetail.image}
          className={cx('chatImage')}
          alt="물물교환 이미지"
        />
        <div className={cx('info')}>
          <h1 className={cx('title')}>{simpleTradePostDetail.title}</h1>
          <p className={cx('author')}>{userProfile.nickname}</p>
          <p className={cx('status')}>{STATUS}</p>
        </div>
      </Link>
      <button
        className={cx('button')}
        onClick={handleClickButton}
        disabled={disabled}
      >
        {ButtonText}
      </button>
    </div>
  );
}