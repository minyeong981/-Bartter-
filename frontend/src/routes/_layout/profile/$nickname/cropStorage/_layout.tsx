import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './cropStorage.module.scss'

export const Route = createFileRoute('/_layout/profile/$nickname/cropStorage/_layout')({
  component: CropStorageLayout
})

export default function CropStorageLayout() {
  return (
    <div className={styles.cropStorageLayout}>
      <HeaderWithLabelAndBackButton label='농작물창고'/>
      <Outlet />
    </div>
  )
}