import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './writed.module.scss'

export const Route = createFileRoute('/_layout/profile/writed/_layout')({
  component: ProfileWritedLayout
})

export default function ProfileWritedLayout() {
  return (
    <div className={styles.writedLayout}>
    <HeaderWithLabelAndBackButton label='내가 쓴 글'/>
    <Outlet />
    </div>
  )
}