import styles from './map.module.scss'

export default function LocationContainer({currentLocation} : {currentLocation: string}) {

    return (
        <div className={styles.mapBox}>
            현재 위치가 내 동네로 설정한 {currentLocation} 에 있습니다.
        </div>
    )
}