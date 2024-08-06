import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './changeLocation.module.scss'

export const Route = createFileRoute('/_layout/profile/changelocation/_layout')({
  component: () => ChangeLocationLayout
})

export default function ChangeLocationLayout() {
    return (
        <div className={styles.changeLocationLayout}>
            <HeaderWithLabelAndBackButton label='위치수정' />
            <Outlet />
        </div>
    )
}