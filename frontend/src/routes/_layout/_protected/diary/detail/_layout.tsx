import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';
import MenuBar from '@/components/MenuBar/MenuBar';

export const Route = createFileRoute('/_layout/_protected/diary/detail/_layout')({
  component: WriteLayout,
});

function WriteLayout() {
  return (
    <>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <Outlet />
      <MenuBar />
    </>
  );
}