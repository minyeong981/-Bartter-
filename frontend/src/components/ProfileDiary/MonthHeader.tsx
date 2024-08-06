// import type { ReactNode } from '@tanstack/react-router'

import styles from './MonthHeader.module.scss'

export default function MonthHeader(
    {leftChild, title, rightChild} :
     {leftChild: React.ReactNode, title:string, rightChild: React.ReactNode}) {
    return( <header className={styles.Header}>
        <div className={styles.headerLeft}>{leftChild}</div>
        <div className={styles.headerCenter}>{title}</div>
        <div className={styles.headerRight}>{rightChild}</div>
    </header>)
}