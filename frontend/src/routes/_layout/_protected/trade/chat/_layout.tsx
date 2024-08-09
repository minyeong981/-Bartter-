import {createFileRoute, Outlet} from '@tanstack/react-router';

import ChatInfoCard from '@/components/ChatInfoCard';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';

export const Route = createFileRoute('/_layout/_protected/trade/chat/_layout')({
  component: ChatLayout,
});

function ChatLayout() {
  return (
    <>
      <HeaderWithLabelAndButtons label="장덕동" />
      <ChatInfoCard />
      <Outlet />
    </>
  );
}