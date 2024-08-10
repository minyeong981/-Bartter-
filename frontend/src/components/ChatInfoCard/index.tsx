import classnames from 'classnames/bind';

import styles from './chatInfoCard.module.scss';

const cx = classnames.bind(styles);

type ChatInfoCardProps = TradeInfo;

export default function ChatInfoCard({
  simpleTradePostDetail,
  userProfile,
}: ChatInfoCardProps) {
  const STATUS = {
    PROGRESS: '거래가능',
    RESERVED: '예약중',
    COMPLETED: '거래완료',
  }[simpleTradePostDetail.status];

  return (
    <div className={cx('chatInfoCard')}>
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
      <button className={cx('button')}>예약하기</button>
    </div>
  );
}