import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './profileDiary.module.scss'

export const Route = createFileRoute('/_layout/profile/$userId/diary/_layout')({
  component: ProfileDiaryLayout
})

export default function ProfileDiaryLayout() {
  return (
    <div className={styles.profileDiaryLayout}>
    <HeaderWithLabelAndBackButton label='농사 일지'/>
    <Outlet />
    </div>
  )
}