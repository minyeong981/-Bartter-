import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithBackButtonAndButtons from '@/components/Header/HeaderWithBackButtonAndButtons.tsx';

export const Route = createFileRoute('/_layout/_protected/trade/to/_layout')({
  component: ToLayout,
});

function ToLayout() {
  return (
    <>
      <HeaderWithBackButtonAndButtons />
      <Outlet />
    </>
  );
}