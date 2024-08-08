import { createFileRoute , Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './profile.module.scss'

export const Route = createFileRoute('/_layout/profile/_layout')({
  component: MyProfileLayout
})

export default function MyProfileLayout() {
  return (
    <div className={styles.profileLayout}>
    <HeaderWithLabelAndBackButton label="프로필" />
    <Outlet />
   </div>
  )
}