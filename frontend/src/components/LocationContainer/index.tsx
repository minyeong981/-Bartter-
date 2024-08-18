import styles from './map.module.scss'

export default function LocationContainer({currentLocation} : {currentLocation: string}) {

    return (
        <div className={styles.mapBox}>
            현재 위치는 <span>{currentLocation}</span>으로 설정되었습니다.
        </div>
    )
}