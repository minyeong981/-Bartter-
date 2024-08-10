import {createFileRoute, Outlet} from '@tanstack/react-router'
import classnames from 'classnames/bind';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './layout.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/search/_layout/_layout/$keyword/_layout')({
  component: SearchResultLayout
})


function SearchResultLayout() {
  // @ts-ignore
  const {sortBy} = Route.useSearch()

  return (
    <>
      <HeaderWithLabelAndBackButton label={sortBy} className={cx('header')}/>
      <Outlet/>
    </>
  )
}