import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';


export const Route = createFileRoute('/_layout/_protected/diary/growDiary/_layout')({
  component: GrowDiaryLayout
})

function GrowDiaryLayout() {
  return (
    <>
      <HeaderWithLabelAndBackButton label="성장 일지" />
      <Outlet />
    </>
  );
}