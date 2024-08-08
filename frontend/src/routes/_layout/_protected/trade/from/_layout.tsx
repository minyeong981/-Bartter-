import {createFileRoute, Outlet} from '@tanstack/react-router'

import HeaderWithBackButtonAndButtons from "@/components/Header/HeaderWithBackButtonAndButtons.tsx";

export const Route = createFileRoute('/_layout/_protected/trade/from/_layout')({
  component: FromLayout
})

function FromLayout() {
  return <>
    <HeaderWithBackButtonAndButtons/>
    <Outlet/>
  </>
}