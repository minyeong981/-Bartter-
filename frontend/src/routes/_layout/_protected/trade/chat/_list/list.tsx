import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import ChatListItem from '@/components/Chat/ChatListItem.tsx';

import styles from './chatList.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/trade/chat/_list/list',
)({
  component: ChatListPage,
});

function ChatListPage() {
  return (
    <div className={cx('chatList')}>
      <ChatListItem
        img="https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"
        sender="훈만"
        item="고양이"
        lastMessage="고양이를 어떻게 키우는지 알려주세요 수수수수퍼노바"
        tradeId={1}
      />
    </div>
  );
}