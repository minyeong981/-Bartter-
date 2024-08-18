import {createFileRoute, Outlet} from '@tanstack/react-router'

import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton.tsx";

export const Route = createFileRoute('/_layout/_protected/trade/mycrops/_layout')({
  component: MyCropsLayout
})

function MyCropsLayout() {
  return <>
    <HeaderWithBackButton/>
    <Outlet/>
  </>
}