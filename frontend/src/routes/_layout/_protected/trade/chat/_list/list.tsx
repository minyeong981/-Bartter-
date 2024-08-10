import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import ChatListItem from '@/components/Chat/ChatListItem.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';

import styles from './chatList.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/trade/chat/_list/list',
)({
  component: ChatListPage,
});

function ChatListPage() {
  const userId = useRootStore(state => state.userId);
  const {data} = useSuspenseQuery({
    queryFn: () => barter.getChatList(userId),
    queryKey: ['chat', userId],
  });

  const chatListData = data.data.data;

  return (
    <div className={cx('chatList')}>
      {!!chatListData.length &&
        chatListData.map(chat => (
          <ChatListItem
            img={chat.userProfile.profileImage}
            sender={chat.userProfile.nickname}
            item="고양이"
            lastMessage={chat.message}
            tradeId={chat.tradeId}
          />
        ))}
    </div>
  );
}