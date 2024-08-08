import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './picked.module.scss'

export const Route = createFileRoute('/_layout/_protected/profile/picked/_layout')({
  component: ProfilePickedLayout
})

export default function ProfilePickedLayout() {
  return (
    <div className={styles.pickedLayout}>
      <HeaderWithLabelAndBackButton label='찜 목록' />
      <Outlet />
    </div>
  )
}