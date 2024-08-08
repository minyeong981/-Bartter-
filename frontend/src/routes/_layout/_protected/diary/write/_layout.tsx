import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';

export const Route = createFileRoute('/_layout/_protected/diary/write/_layout')({
  component: WriteLayout,
});

function WriteLayout() {
  return (
    <>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <Outlet />
    </>
  );
}