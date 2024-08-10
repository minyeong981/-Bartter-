import { createFileRoute,Outlet } from '@tanstack/react-router'

import { SearchProvider } from '@/context/SearchContext'

export const Route = createFileRoute('/_layout/_protected/search/_layout')({
  component: SearchWrapper
})

export default function SearchWrapper() {
  return (
    <SearchProvider>
      <Outlet />
    </SearchProvider>
  )
}