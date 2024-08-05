import { createFileRoute, Outlet , useNavigate } from '@tanstack/react-router'

import FloatingButton from '@/components/Buttons/FloatingButton'
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons'
import Navigation from '@/components/Navigation'

import styles from './community.module.scss'

export const Route = createFileRoute('/_layout/community/_layout')({
  component: Community
})

export default function Community() {

    const nav = useNavigate({from:'/community'})

    return (
        <div className={styles.community}>
            <HeaderWithLabelAndButtons label="내위치" />
            <Outlet />
            <FloatingButton onClick={() => nav({to:'/community/create'})}>+ 글 작성하기</FloatingButton>
            <Navigation />
        </div>
    )
}