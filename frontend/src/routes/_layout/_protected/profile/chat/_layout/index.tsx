import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import ChatListItem from '@/components/Chat/ChatListItem/ChatListItem.tsx';
import EmptyPost from '@/components/Empty/EmptyPost.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';

export const Route = createFileRoute(
  '/_layout/_protected/profile/chat/_layout/',
)({
  component: ProfileChat,
});

export default function ProfileChat() {
  const userId = useRootStore(state => state.userId);
  const {data} = useSuspenseQuery({
    queryFn: () => barter.getChatList(Number(userId)),
    queryKey: ['chatList', userId],
  });

  const chatListData = data.data.data;

  return (
    <div>
      {chatListData.length ? (
        chatListData.map(chat => (
          <ChatListItem
            key={chat.tradeId}
            {...chat}
            tradePostId={Number(chat.tradeId)}
          />
        ))
      ) : (
        <EmptyPost text="채팅 목록이 없습니다." />
      )}
    </div>
  );
}