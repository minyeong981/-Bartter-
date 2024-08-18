import { Link } from '@tanstack/react-router';
import classnames from 'classnames/bind'
import { FaChevronRight } from 'react-icons/fa';
import Lottie from 'react-lottie-player';

import styles from './title.module.scss'

interface TitleProps {
    title: string;
    to?: string;
    lottie?:object; 
}

const cx = classnames.bind(styles)

export default function Title({title, to, lottie} : TitleProps){

    return (
        <div className={cx('titleContainer')}>
            <div className={cx('title')}>{title} 
                <Lottie loop animationData={lottie} play className={cx('animation')} />
            </div> 
            <div className={cx('linkButton')}> 
                {to ? <Link to={to}> 더보기 <FaChevronRight /></Link> : undefined}
            </div>
        </div>
    )
}