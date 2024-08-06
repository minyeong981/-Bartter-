import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';

export const Route = createFileRoute('/_layout/trade/write/_layout')({
  component: WriteLayout,
});

function WriteLayout() {
  return (
    <>
      <HeaderWithLabelAndBackButton label="글 작성하기" />
      <Outlet />
    </>
  );
}