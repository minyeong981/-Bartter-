import { createFileRoute,Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import { SearchProvider } from '@/context/SearchContext'

import styles from './search.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/search/_layout')({
  component: SearchWrapper
})

export default function SearchWrapper() {
  return (
    <div className={cx('search-layout')}>
    <SearchProvider>
      <Outlet />
    </SearchProvider>
    </div>
  )
}