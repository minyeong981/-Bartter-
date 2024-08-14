import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './chatListItem.module.scss';

const cx = classnames.bind(styles);

type ChatListItemProps = LinkProps & SimpleTradeInfo & {tradePostId: number};

export default function ChatListItem({
  userProfile,
  message,
  tradePostId,
  tradeId,
  ...props
}: ChatListItemProps) {
  return (
    <Link
      className={cx('chatItem')}
      {...props}
      to="/trade/chat/$tradePostId/$tradeId"
      params={{tradePostId: String(tradePostId), tradeId: String(tradeId)}}
    >
      <img src={userProfile.profileImage} alt="사용자 프로필 이미지"/>
      <div className={cx('content')}>
        <h2 className={cx('sender')}>{userProfile.nickname}</h2>
        <p className={cx('item')}>상품</p>
        <p className={cx('lastMessage')}>{message}</p>
      </div>
    </Link>
  );
}