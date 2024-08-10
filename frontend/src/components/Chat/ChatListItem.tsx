import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './chatListItem.module.scss';

const cx = classnames.bind(styles);

type ChatListItemProps = LinkProps & {
  img: string;
  sender: string;
  item: string;
  lastMessage: string;
  tradeId: number;
};

export default function ChatListItem({
  img,
  sender,
  item,
  lastMessage,
  tradeId,
  ...props
}: ChatListItemProps) {
  return (
    <Link
      className={cx('chatItem')}
      {...props}
      to="/trade/chat/$tradeId"
      params={{tradeId: String(tradeId)}}
    >
      <img src={img} />
      <div className={cx('content')}>
        <h2 className={cx('sender')}>{sender}</h2>
        <p className={cx('item')}>{item}</p>
        <p className={cx('lastMessage')}>{lastMessage}</p>
      </div>
    </Link>
  );
}