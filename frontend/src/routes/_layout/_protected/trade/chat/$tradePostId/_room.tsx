import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Outlet} from '@tanstack/react-router';

import ChatInfoCard from '@/components/ChatInfoCard';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import barter from '@/services/barter.ts';

export const Route = createFileRoute(
  '/_layout/_protected/trade/chat/$tradePostId/_room',
)({
  component: ChatLayout,
});

function ChatLayout() {
  const {tradePostId} = Route.useParams();

  const {data} = useSuspenseQuery({
    queryFn: () => barter.getChatRoomInfo(Number(tradePostId)),
    queryKey: ['trade', 'chat', tradePostId],
  });

  const chatRoomInfo = data.data.data;
  console.log(chatRoomInfo.userProfile);

  return (
    <>
      <HeaderWithLabelAndButtons label="장덕동" />
      <ChatInfoCard {...chatRoomInfo} />
      <Outlet />
    </>
  );
}