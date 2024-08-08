import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons'
import Location from '@/components/Header/Location'
import Navigation from '@/components/Navigation'

import styles from './home.module.scss'

export const Route = createFileRoute('/_layout/_protected/_home')({
  component: Home
})

export default function Home() {
  return(
    <div className={styles.home}>
      <HeaderWithLabelAndButtons label={<Location location="내위치" />} />
      <Outlet />
      <Navigation />
    </div>
  )
}