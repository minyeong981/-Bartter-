import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';

export const Route = createFileRoute('/_layout/_protected/trade/chat/_list')({
  component: ListLayout,
});

function ListLayout() {
  return (
    <>
      <HeaderWithLabelAndBackButton label="채팅 목록" />
      <Outlet />
    </>
  );
}