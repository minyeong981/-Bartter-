import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet , useNavigate } from '@tanstack/react-router'

import FloatingButton from '@/components/Buttons/FloatingButton'
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons'
import Location from '@/components/Header/Location'
import Navigation from '@/components/Navigation'
import barter from '@/services/barter'
import useRootStore from '@/store'
import querykeys from '@/util/querykeys'

import styles from './community.module.scss'

export const Route = createFileRoute('/_layout/_protected/community/_layout')({
  component: Community
})

export default function Community() {

    const userId : UserId = useRootStore((state) => state.userId)
    const nav = useNavigate({from:'/community'})
    const {data} = useSuspenseQuery({
        queryKey: [querykeys.LOCATION, userId],
        queryFn: () => barter.getUserLocation(userId)
    })

    const location = data.data.data

    return (
        <div className={styles.community}>
            <HeaderWithLabelAndButtons label={<Location location={location.name.split(' ').slice(2,3).toString()} />} />
            <Outlet />
            <FloatingButton onClick={() => nav({to:'/community/create'})}>+ 글 작성하기</FloatingButton>
            <Navigation />
        </div>
    )
}