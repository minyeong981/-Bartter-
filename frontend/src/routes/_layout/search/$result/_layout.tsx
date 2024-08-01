import {createFileRoute, Outlet} from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './layout.module.scss'

export const Route = createFileRoute('/_layout/search/$result/_layout')({
  component: SearchResultLayout
})


function SearchResultLayout() {
  // @ts-ignore
  const {sortBy} = Route.useSearch()

  return (
    <>
      <HeaderWithLabelAndBackButton label={sortBy} className={styles.header}/>
      <Outlet/>
    </>
  )
}