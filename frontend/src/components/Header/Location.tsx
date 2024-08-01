import { FaMapMarkerAlt } from 'react-icons/fa';

import styles from './Location.module.scss'


export default function Location({location}: {location : string}) {
    return (
        <div className={styles.location}>
            <FaMapMarkerAlt className={styles.locaionIcon} /> 
            {location}
        </div>
    )
}