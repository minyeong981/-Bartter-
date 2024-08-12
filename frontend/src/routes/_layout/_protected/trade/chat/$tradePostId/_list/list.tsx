import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import ChatListItem from '@/components/Chat/ChatListItem/ChatListItem.tsx';
import EmptyPost from '@/components/Empty/EmptyPost.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';

import styles from './chatList.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/trade/chat/$tradePostId/_list/list',
)({
  component: ChatListPage,
});

function ChatListPage() {
  const userId = useRootStore(state => state.userId);
  const {tradePostId} = Route.useParams();
  const {data} = useSuspenseQuery({
    queryFn: () => barter.getChatListByTradePostId(Number(tradePostId)),
    queryKey: ['chat', tradePostId],
  });

  const chatListData = data.data.data;

  console.log(chatListData);

  return (
    <div className={cx('chatList')}>
      {chatListData.length ? (
        chatListData.map(chat => (
          <ChatListItem
            key={chat.tradeId}
            {...chat}
            tradePostId={Number(tradePostId)}
          />
        ))
      ) : (
        <EmptyPost text="채팅 목록이 없습니다." />
      )}
    </div>
  );
}