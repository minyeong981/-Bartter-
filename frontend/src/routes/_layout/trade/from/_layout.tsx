import {createFileRoute, Outlet} from '@tanstack/react-router'

import HeaderWithBackButtonAndButtons from "@/components/Header/HeaderWithBackButtonAndButtons.tsx";

export const Route = createFileRoute('/_layout/trade/from/_layout')({
  component: FromLayout
})

function FromLayout() {
  return <>
    <HeaderWithBackButtonAndButtons/>
    <Outlet/>
  </>
}