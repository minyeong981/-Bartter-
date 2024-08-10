import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './chatListItem.module.scss';

const cx = classnames.bind(styles);

type ChatListItemProps = LinkProps & SimpleTradeInfo & {tradePostId: number};

export default function ChatListItem({
  userProfile,
  message,
  tradeId,
  tradePostId,
  ...props
}: ChatListItemProps) {
  return (
    <Link
      className={cx('chatItem')}
      {...props}
      to="/trade/chat/$tradePostId/$tradeId"
      params={{tradeId: String(tradeId), tradePostId: String(tradePostId)}}
    >
      <img src={userProfile.profileImage} />
      <div className={cx('content')}>
        <h2 className={cx('sender')}>{userProfile.nickname}</h2>
        <p className={cx('item')}>상품</p>
        <p className={cx('lastMessage')}>{message}</p>
      </div>
    </Link>
  );
}