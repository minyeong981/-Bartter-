import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './../profile.module.scss'

export const Route = createFileRoute('/_layout/_protected/profile/$userId/_layout')({
  component: ProfileLayout
})

export default function ProfileLayout() {
  return (
     <div className={styles.profileLayout}>
      <HeaderWithLabelAndBackButton label="프로필" />
      <Outlet />
     </div>
  )
}