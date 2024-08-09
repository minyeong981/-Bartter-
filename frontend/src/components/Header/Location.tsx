import classnames from 'classnames/bind'
import { FaMapMarkerAlt } from 'react-icons/fa';

import styles from './Location.module.scss'


export default function Location({location}: {location : string}) {

    const cx = classnames.bind(styles)
    return (
        <div className={cx('location')}>
            <FaMapMarkerAlt className={cx('location-icon')} /> 
            <div className={cx('location-text')}>{location}</div>
        </div>
    )
}