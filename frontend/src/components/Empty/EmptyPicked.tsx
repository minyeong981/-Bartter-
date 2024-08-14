import classnames from 'classnames/bind';
import Lottie from 'react-lottie-player';

import empty from '@/assets/lottie/emptyPicked.json'

import styles from './EmptyPicked.module.scss'

const cx = classnames.bind(styles);

export default function EmptyPicked() {
    return (
        <div className={cx('container')}>
            <div className={cx('text')}>찜한 글이 없습니다</div>
            <Lottie loop animationData={empty} play className={cx('animation')} />
        </div>
    )
}