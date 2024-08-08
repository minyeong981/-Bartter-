import {createFileRoute, Outlet} from '@tanstack/react-router';

import ChattingButtonContainer from '@/components/ChattingButtonContainer';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';

export const Route = createFileRoute('/_layout/_protected/trade/detail/_layout')({
  component: TradeDetailLayout,
});

function TradeDetailLayout() {
  return (
    <>
      <HeaderWithBackButton />
      <Outlet />
      <ChattingButtonContainer />
    </>
  );
}