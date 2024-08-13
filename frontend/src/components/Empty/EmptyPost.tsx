import classnames from 'classnames/bind'
import Lottie from 'react-lottie-player';

import empty from '@/assets/lottie/emptyPost.json'

import styles from './EmptyPost.module.scss'

export default function EmptyPost({text, text2} : {text?:string, text2?:string}) {
    const cx = classnames.bind(styles)

    return (
        <div className={cx('container')}>
            <div className={cx('text')}>{text}</div>
            <div className={cx('text')}>{text2}</div>
        <Lottie loop animationData={empty} play className={cx('animation')} />
    </div>
    )
}