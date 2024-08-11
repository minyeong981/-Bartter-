// import type { ReactNode } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import styles from './MonthHeader.module.scss'

interface MonthHeaderProps {
    leftChild : React.ReactNode;
    title: string;
    rightChild : React.ReactNode;
    isFixed? : boolean;
}

const cx=classnames.bind(styles)
export default function MonthHeader(
    {leftChild,
     title, 
     rightChild, 
     isFixed=false
    } : MonthHeaderProps ) {

    return( 
    
    <header className={cx('header', { 'fixed' : isFixed})}>
        <div className={cx('header-left')}>{leftChild}</div>
        <div className={cx('header-center')}>{title}</div>
        <div className={cx('header-right')}>{rightChild}</div>
    </header>)
}