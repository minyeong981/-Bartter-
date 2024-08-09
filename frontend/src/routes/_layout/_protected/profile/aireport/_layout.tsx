import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './aireport.module.scss'

export const Route = createFileRoute('/_layout/_protected/profile/aireport/_layout')({
  component: AiReportLayout
})

export default function AiReportLayout() {
  return (
    <div className={styles.aireportLayout}>
      <HeaderWithLabelAndBackButton label='AI 요약 보고서'/>
      <Outlet />
    </div>
  )
}